declare function require(s: string): any;

import {Application, Activity, MenuItem, Route, Action} from './himbaSchema'
import {navigate, expandRoutePath, registerRoute} from './himbaRouter';

var Tracker = require('./third/himbaTracker.js')
export const autorun = Tracker.autorun as (fn: (computation?: TrackerComputation) => void) => TrackerComputation;

export import utils = require('./utils.ts');
import './array_extensions'
import './date_extensions'
import './number_extensions'
import './string_extensions'

var _activities: Activity[] = [];
var _currentActivity = reactiveVar<Activity>(null);
var _searchText = reactiveVar('');

export var application: Application = {
  apptitle: null,
  menuItems: null,
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
    catch(e) {
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
  startup: null

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

// TODO imba compiler style
(application as any).setSearchText = function(v) {
  this.searchText = v;
};


export function declareApplication(opts: {
  title: () => string,
  menuItems: () => MenuItem[],
  fatalError: (e: Error) => void,
  startup: () => void
}): Application {
  utils.asap(() => {
    application.apptitle = dependencyWithCache(() => {
      return document.title = opts.title();
    });
    application.menuItems = dependencyWithCache(() => opts.menuItems().map((mi) => {
      var r = utils.clone(mi);
      r.href = dependencyWithCache(() => expandRoutePath(mi.href()));
      return r;
    }));
    application.fatalError = opts.fatalError;
    application.startup = function() {
      utils.asap(opts.startup);
      _startup_list.forEach(utils.asap);
      _startup_list = null;
    }
  });
  return application;
}

export var registerView: (route: Route) => void;

export function defineActivity(opts: {
  name: string,
  icon(): string,
  title(): string,
  state(): any,
  actions(): Action<any>[]
}) {
  var _content = reactiveVar<any>(null);
  var activity: Activity = {
    name: opts.name,
    icon: opts.icon,
    title: opts.title,
    state: opts.state,
    actions: opts.actions,
    running: null,
    content() {
      return _content.get();
    }
  }
  _activities.push(activity);

  registerView = function(route: Route) {
    var url = route.url;
    var render = route.render;
    registerRoute(url, {
      title: activity.title,
      icon: activity.icon,
      visible: () => true,
      enabled: () => true,
      execute(params: any[]) {
         _currentActivity.set(activity);
         navigate(url);
         try {
          _content.set(render(activity.state(), params));
         }
         catch(e) {
            application.fatalError(e);
         }
      }
    })
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
