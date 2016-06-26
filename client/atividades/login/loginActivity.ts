
import {dependency, defineActivity} from '../../lib/himba'

export var loginActivity = defineActivity({
  name: 'login',
  title: () => 'Login',
  icon: () => 'person',
  roles: [],
  actions() {
    return [
      {
        title: () => 'Esqueci senha',
        icon: () => 'help-circle',
        roles: [],
        execute() {

        }
      },
      {
        title: () => 'Fazer meu cadastro',
        icon: () => 'add',
        roles: [],
        execute() {

        }
      }
    ];
  }
});

import './loginView.imba';
