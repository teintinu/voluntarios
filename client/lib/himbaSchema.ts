
export interface Application {
  apptitle(): string,
  navigate(url: string, replace: boolean): void;
  menuItems(): MenuItem[],
  currentActivity(): Activity,
  actions(): Action<any>[],
  content(): any,
  // curr_activity: CurrentActivity,
  // openned_activity: ActivityInfo[],
  // error: string,

  // welcomeStore: BundleLazy,
  // loginStore: BundleLazy,
  // errorStore: BundleLazy,
  // isMobile: boolean,
  // session: AppSession
}

export interface MenuItem {
  icon: () => string,
  title: () => string,
  href: () => string
}

export interface Activity {
  name: string,
  icon(): string,
  title(): string,
  state(): any,
  actions(): Action<any>[],
  running?: () => Action<any>,
  content?: () => any,
  // setStep(s: string): string;
  // queryClose(): void;
  // getTask(): string,
  // backStep(): boolean;
}

export interface Action<PARAMS> {
  name: string,
  visible(): boolean;
  enabled(): boolean;
  icon(): string,
  title(): string,
  execute(params: PARAMS);
}

// export interface ProcessInfo {
//   processName: string,
//   reference: Activity,
//   task: Action
//   //view_ref: Reference
// }


// export interface Reference {

// }

// export interface DialogInfo{
//       title: string,
//       buttons: string[],
//       callback: ()=>void
// }

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
