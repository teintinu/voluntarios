
export interface Application {
  apptitle(): string,
  navigate(url: string, replace: boolean): void;
  menuItems(): MenuItem[],
  currentActivity(): Activity,
  actions(): ActionTask[],
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
  name: string,
  icon: string,
  title: string,
  href: string
}

export interface Activity {
  name: string,
  icon(): string,
  title(): string,
  state(): any,
  actions(): ActionTask[],
  running?: () => ActionTask,
  content?: () => any,
  // setStep(s: string): string;
  // queryClose(): void;
  // getTask(): string,
  // backStep(): boolean;
}

export interface ActionTask {
}
