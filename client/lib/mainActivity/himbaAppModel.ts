
export interface Application {
  apptitle: string,
  curr_process: CurrentProcess,
  openned_processes: ProcessInfo[],
  error: string,

  welcomeStore: BundleLazy,
  loginStore: BundleLazy,
  errorStore: BundleLazy,
  menuItems: MenuItem[],
  isMobile: boolean,
  session: AppSession
}

export interface DialogInfo{
      title: string,
      buttons: string[],
      callback: ()=>void
}

export interface MenuItem {
  name: string,
  module: BundleLazy
}

export interface ProcessStore {
  getState(): ProcessStoreInfo,
  getActions(): any // TODO
  queryClose(): void;
  getTask(): string,
  setStep(s: string): string;
  backStep(): boolean;
  releaseRef(): void;
}

export interface ProcessStoreInfo {
  step: BundleLazy,
}


export interface CurrentProcess {
  processInfo: ProcessInfo;
  process: ProcessStore,
  processName: string,
  stepTitle: string,
  task: ActionTaskTODO,
  active_view: {
    view_ref: Reference,
    actions: ActionsTaskTODO
  }
}

export interface ProcessInfo {
  processName: string,
  reference: ProcessStore,
  task: ActionTaskTODO,
  view_ref: Reference
}

export interface ActionsTaskTODO {
}

export interface ActionTaskTODO {
}

export interface AppSession {
  language: string,
  login: LoginData
}

export interface LoginData {
  id_login: string;
  expireInDays: number;
}

export type BundleLazy = (callback: (mod: Disposable<ProcessStore>) => void) => void;

export var appData: Application = {
  apptitle: 'App Store',
  curr_process: null,
  openned_processes: [],
  error: null,
  welcomeStore: null,
  errorStore: null,
  loginStore: null,
  menuItems: [],
  isMobile: window.innerWidth < 750,
  session: {
    language: "pt_br",
    login: getCookieLogin()
  }
}

export function getCookieLogin(): LoginData {
  var id_login = document.cookie.replace(/(?:(?:^|.*;\s*)_idLogin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  return {
    id_login: id_login,
    expireInDays: 0
  };
}

export function setCookieLogin(loginInfo: LoginData) {
  var date, expires;
  date = new Date(); //  criando o COOKIE com a data atual
  date.setTime(date.getTime() + (loginInfo.expireInDays * 24 * 60 * 60 * 1000));
  expires = date.toUTCString();
  document.cookie = encodeURIComponent("_idLogin") + "=" + encodeURIComponent(loginInfo.id_login); // + "; expires=" + expires;
}

export function removeCookieLogin() {
  document.cookie = encodeURIComponent("_idLogin") + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
