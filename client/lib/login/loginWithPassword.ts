
import {LoginService, LoginInfo} from '../himbaSchema';

export class LoginWithPassword implements LoginService {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = hashPassword(password);
  };
  login(callback: (err: Error, loginInfo: LoginInfo) => void) {
    if (this.password == '123')
      callback(null, {
        service: 'password',
        email: this.email,
        token: '4321-' + this.email
      });
    else
      callback(new Error('senha invalida'), null);
  }
}


function hashPassword(password) {
  return password;
}
