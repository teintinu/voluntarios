import {LoginService, LoginInfo} from '../himbaSchema';

export class LoginWithGoogle implements LoginService {
  appId: string;
  constructor(appId) {
    this.appId = appId;
  };
  login(callback: (err: Error, session: LoginInfo) => void) {
    callback(new Error('TODO'), null);
  }
}
