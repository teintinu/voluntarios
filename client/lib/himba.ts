declare function require(s: string): any;

import {Application, Activity, MenuItem, Route, Action, LoginService, LoginInfo, RoleID, RoleObj, RolesNames} from './himbaSchema'
import {navigate, expandRoutePath, registerRoute} from './himbaRouter';

var Tracker = require('../../third/client/himbaTracker.js')
export const autorun = Tracker.autorun as (fn: (computation?: TrackerComputation) => void) => TrackerComputation;

export import utils = require('./utils.ts');
import './array_extensions'
import './date_extensions'
import './number_extensions'
import './string_extensions'
import './regexp_extensions'

var _activities: Activity[] = [];
var _currentActivity = reactiveVar<Activity>(null);
var _searchText = reactiveVar('');
var _sessionRolesDep = dependency()
var _sessionRoles: RoleObj
var _rolesNames: RolesNames

export var application: Application = {
  apptitle: null,
  menuItems: null,
  userActions: null,
  fatalError: null,
  navigate: navigate,
  currentActivity() {
    return _currentActivity.get()
  },
  content() {
    try {
      var c = _currentActivity.get();
      return c && c.content() || 'NO CONTENT';
    }
    catch (e) {
      application.fatalError(e);
    }
  },
  actions() {
    var c = _currentActivity.get();
    if (c)
      return c.actions();
    return [];
  },
  get searchText(): string {
    return _searchText.get()
  },
  set searchText(value: string) {
    _searchText.set(value)
  },
  startupApplication: null,
  startupSession: null,
  destroySession: null,
  userId: null,
  userName: null,
  resumeToken: null,
  loginWith(loginService: LoginService) {
    loginService.login(function(err, loginInfo) {
      if (err) application.fatalError(err)
      else {
        var roles = application.startupSession(loginInfo);
        applyRoles(roles)
      }
    });
  },
  logout() {
    application.destroySession()
    applyRoles([]);
  },
  logged() {
    return application.resumeToken() != '';
  },
  hasAnyRole(roles: RoleID[]): boolean {
    if (application.logged()) {
      _sessionRolesDep.depend();
      if (_sessionRoles['root']) return true;
      if (roles && roles.length)
        return roles.some((r) => _sessionRoles[r.name] || r == anyUser);
      return true;
    }
    return !(roles && roles.length) || roles.some((r) => r == anonymous);
  }


  // curr_process: null,
  // openned_processes: [],
  // error: null,
  // welcomeStore: null,
  // errorStore: null,
  // loginStore: null,
  // isMobile: window.innerWidth < 750,
  // session: {
  //   language: "pt_br",
  //   login: getCookieLogin()
  // }
};

function applyRoles(roles: number[]) {
  (Object.keys(_rolesNames)).forEach(function(s) {
    var r = _rolesNames[s];
    _sessionRoles[r.name] = roles.indexOf(r.value) >= 0;
  });
  _sessionRolesDep.changed();
}

// TODO imba compiler style
(application as any).setSearchText = function(v) {
  this.searchText = v;
};

export function declareApplication(opts: {
  title: () => string,
  menuItems: () => MenuItem[],
  userActions: () => Action<any>[],
  fatalError: (e: Error) => void,
  startupApplication: () => void,
  startupSession: (loginInfo: LoginInfo) => number[],
  destroySession: () => void,
  userId: () => string,
  userName: () => string,
  resumeToken: () => string,
  roleObj: any,
  rolesNames: any
}): Application {

  init_roles();

  application.fatalError = opts.fatalError;
  application.userId = opts.userId;
  application.userName = opts.userName;
  application.resumeToken = opts.resumeToken;
  application.startupApplication = function() {
    utils.asap(opts.startupApplication);
    _startup_list.forEach(utils.asap);
    _startup_list = null;
  }
  application.startupSession = opts.startupSession;
  application.destroySession = opts.destroySession;

  utils.asap(() => {
    application.apptitle = dependencyWithCache(() => {
      return document.title = opts.title();
    });
    application.menuItems = createReactiveMenuItems(opts.menuItems)
    application.userActions = createReactiveMenuActions(opts.userActions)
  });
  return application;

  function init_roles() {
    var n_role = Object.keys(opts.roleObj);
    var n_rolesNames = Object.keys(opts.rolesNames);
    if (n_role.length != n_rolesNames.length) throw new Error('Erro interno no Roles');
    _sessionRoles = {};
    n_role.forEach(function(r) {
      if (!opts.rolesNames[r]) throw new Error('Erro interno no Roles: ' + r);
      opts.rolesNames[r].name = r;

      _sessionRoles[r] = false;
      opts.roleObj[r] = function() {
        _sessionRolesDep.depend();
        return _sessionRoles[r];
      }
    });
    _rolesNames = opts.rolesNames
  }
}

function createReactiveMenuItems(itemsFunc: () => MenuItem[]): () => MenuItem[] {
  return dependencyWithCache(() =>
      itemsFunc()
        .filter((mi) => application.hasAnyRole(mi.roles))
        .map((mi) => {
          var r = utils.clone(mi);
          r.href = dependencyWithCache(() => expandRoutePath(mi.href()));
          return r;
        }));
}

function createReactiveMenuActions(itemsFunc: () => Action<any>[]): () => Action<any>[] {
  return dependencyWithCache(() =>
    itemsFunc()
      .filter((mi) => application.hasAnyRole(mi.roles))
  );
}

export var registerView: (route: Route) => void;

export function defineActivity(opts: {
  name: string,
  icon(): string,
  title(): string,
  roles: RoleID[],
  actions(): Action<any>[]
}) {
  var _content = reactiveVar<any>(null);
  var activity: Activity = {
    name: opts.name,
    icon: opts.icon,
    title: opts.title,
    actions: () => [],
    roles: opts.roles,
    running: null,
    content() {
      return _content.get();
    }
  }

  utils.asap(function() {
    activity.actions = createReactiveMenuActions(opts.actions);
  });

  _activities.push(activity);

  registerView = function(route: Route) {
    var url = route.url;
    var render = route.render;
    registerRoute(url, {
      title: activity.title,
      icon: activity.icon,
      roles: opts.roles,
      execute(params: any[]) {
        if (application.hasAnyRole(activity.roles)) {
          _currentActivity.set(activity);
          navigate(url);
          try {
            _content.set(render(params));
          }
          catch (e) {
            application.fatalError(e);
          }
        }
        else application.fatalError(new Error("Acesso negado"));
      }
    });
  };
}

export interface TrackerComputation {
  stop(): void;
}

export interface TrackerDependency {
  depend(): void;
  depend(computation: TrackerComputation): void;
  changed(): void;
}

export interface ReactiveVar<T> {
  get(): T;
  set(value: T): void;
}

export function dependency(): TrackerDependency {
  return new Tracker.Dependency as TrackerDependency;
}

export function reactiveVar<T>(init: T): ReactiveVar<T> {
  var _val = init;
  var _dep = dependency();
  return {
    get() {
      _dep.depend()
      return _val
    },
    set(value) {
      _val = value;
      _dep.changed();
    }
  };
}

export function dependencyWithCache<T>(fn: () => T): () => T {
  var _cache
  var _dep = dependency();
  autorun(function() {
    _cache = fn();
    _dep.changed();
  });
  return function() {
    _dep.depend();
    return _cache;
  }
}

var _startup_list = [];
export function startup(fn: () => void)
{
  if (_startup_list)
    _startup_list.push(fn);
  else
    utils.asap(fn);
}

export var anyUser: RoleID = {
  value: -1,
  title: null
}

export var anonymous: RoleID = {
  value: -2,
  title: null
}
