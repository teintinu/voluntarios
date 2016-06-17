

declare function require(s: string): any;

var Tracker = require('./third/himbaTracker.js')

import {Application, Activity, MenuItem, ActionTask} from './himbaSchema'

var _activities: Activity[] = [];
var _currentActivity = reactiveVar<Activity>(null);

export var application: Application = {
  apptitle: null,
  menuItems: null,
  navigate(url) {

  },
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
  menuItems: () => MenuItem[]
}): Application {
  application.apptitle = dependencyWithCache(opts.title);
  application.menuItems = dependencyWithCache(opts.menuItems);
  return application;
}



// export interface Reference {

// }

// export interface DialogInfo{
//       title: string,
//       buttons: string[],
//       callback: ()=>void
// }

export function defineActivity(activity: Activity) {
  delete activity.running;
  _activities.push(activity);
}

// export interface ActivityInfo {
//   step: BundleLazy,
// }

// export interface CurrentActivity {
//   activityInfo: ActivityState;
//   activity: Activity,
//   activityName: string,
//   stepTitle: string,
//   running: ActionTask,
//   active_view: {
//     view_ref: Reference,
//     actions: ActionTask[]
//   }
// }

// export interface ProcessInfo {
//   processName: string,
//   reference: Activity,
//   task: ActionTask,
//   view_ref: Reference
// }



// export interface AppSession {
//   language: string,
//   login: LoginData
// }

// export interface LoginData {
//   id_login: string;
//   expireInDays: number;
// }

//export type BundleLazy = (callback: (mod: Disposable<Activity>) => void) => void;



// // export class H5App
// //   prop title
// //   prop sidebarMenuItems
// //   prop actionMenuItems
// //   prop content




// export function getCookieLogin(): LoginData {
//   var id_login = document.cookie.replace(/(?:(?:^|.*;\s*)_idLogin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//   return {
//     id_login: id_login,
//     expireInDays: 0
//   };
// }

// // export function setCookieLogin(loginInfo: LoginData) {
// //   var date, expires;
// //   date = new Date(); //  criando o COOKIE com a data atual
// //   date.setTime(date.getTime() + (loginInfo.expireInDays * 24 * 60 * 60 * 1000));
// //   expires = date.toUTCString();
// //   document.cookie = encodeURIComponent("_idLogin") + "=" + encodeURIComponent(loginInfo.id_login); // + "; expires=" + expires;
// // }

// // export function removeCookieLogin() {
// //   document.cookie = encodeURIComponent("_idLogin") + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// // }

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

export function autorun(fn: (computation: TrackerComputation) => void): TrackerComputation {
  return Tracker.autorun(fn) as TrackerComputation;
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

export const utils = require('./utils.ts')
