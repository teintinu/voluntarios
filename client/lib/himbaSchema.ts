
export interface Application {
  apptitle(): string,
  navigate(url: string, replace: boolean): void;
  menuItems(): MenuItem[],
  currentActivity(): Activity,
  actions(): Action<any>[],
  content(): any,
  searchText: string,
  fatalError(e: Error): void
  startupApplication(): void
  startupSession(loginInfo: LoginInfo): number[]
  destroySession(): void
  userActions(): Action<any>[]
  userId(): string;
  userName(): string;
  resumeToken(): string;
  loginWith(loginService: LoginService);
  logout(),
  logged(): boolean,
  hasAnyRole(roles: RoleID[]): boolean
  //roles(): Roles
  // curr_activity: CurrentActivity,
  // openned_activity: ActivityInfo[],
  // error: string,

  // welcomeStore: BundleLazy,
  // loginStore: BundleLazy,
  // errorStore: BundleLazy,
  // isMobile: boolean,
  // session: AppSession
}

export interface RoleID {
  value: number,
  name?: string,
  title: string
}

export interface RoleObj {
  [index: string]: boolean
}

export interface RolesNames {
  [index: string]: RoleID
}

export interface LoginService {
  login(callback: (err: Error, loginInfo: LoginInfo) => void);
}


export interface LoginInfo {
  service: string
  token: string
  email?: string
  options?: string[]
}

export interface MenuItem {
  icon: () => string,
  title: () => string,
  href: () => string,
  roles: RoleID[]
}

export interface Activity {
  name: string,
  icon(): string,
  title(): string,
  roles: RoleID[],
  actions(): Action<any>[],
  running: () => Action<any>,
  content: () => any
  // setStep(s: string): string;
  // queryClose(): void;
  // getTask(): string,
  // backStep(): boolean;
}

export interface Route {
  url: string, render: (params: any[]) => void
}

export interface Action<PARAMS> {
  roles: RoleID[],
  icon(): string,
  title(): string,
  visible?: () => boolean,
  disabled?: () => string;
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
