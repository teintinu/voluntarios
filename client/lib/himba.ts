declare function require(s: string): any;

import {Application, Activity, MenuItem, Route, Action} from './himbaSchema'
import {navigate, expandRoutePath, registerRoute} from './himbaRouter';

var Tracker = require('./third/himbaTracker.js')
export const autorun = Tracker.autorun as (fn: (computation?: TrackerComputation) => void) => TrackerComputation;

export import utils = require('./utils.ts');

var _activities: Activity[] = [];
var _currentActivity = reactiveVar<Activity>(null);

export var application: Application = {
  apptitle: null,
  menuItems: null,
  fatalError: null,
  navigate: navigate,
  currentActivity() {
    return _currentActivity.get()
  },
  content() {
    var c = _currentActivity.get();
    return c && c.content() || 'NO CONTENT';
  },
  actions() {
    var c = _currentActivity.get();
    if (c)
      return c.actions();
    return [];
  },


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

export function declareApplication(opts: {
  title: () => string,
  menuItems: () => MenuItem[],
  fatalError: (e: Error) => void
}): Application {
  application.apptitle = dependencyWithCache(opts.title);
  application.menuItems = dependencyWithCache(() => opts.menuItems().map( (mi) => {
    mi.href = () => expandRoutePath(mi.href);
    return mi;
  }));
  application.fatalError = opts.fatalError;
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
      debugger
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
        debugger
         _currentActivity.set(activity);
         navigate(url);
        _content.set(render(activity.state(), params));
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

