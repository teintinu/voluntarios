
import {dependency, defineActivity} from '../../lib/himba'

export var loginActivity = defineActivity({
  name: 'login',
  title: () => 'Login',
  icon: () => 'person',
  //roles: [Roles.public],
  state() {
  },
  actions() {
    return [
      {
        title: () => 'Esqueci senha',
        icon: () => 'add',
        visible: () => true,
        enabled: () => true,
        execute() {

        }
      },
      {
        title: () => 'Fazer meu cadastro',
        icon: () => 'add',
        visible: () => true,
        enabled: () => true,
        execute() {

        }
      }
    ];
  }
});

import './loginView.imba';
