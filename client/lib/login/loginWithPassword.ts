
import {LoginService, LoginInfo} from '../himbaSchema';

export class LoginWithPassword implements LoginService {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = hashPassword(password);
  };
  login(callback: (err: Error, session: LoginInfo) => void) {
    if (this.email == 'teste@teste' && this.password == '123')
      callback(null, {
        service: 'password',
        token: '4321'
      });
    else
      callback(new Error('senha invalida'), null);
  }
}


function hashPassword(password) {
  return password;
}
