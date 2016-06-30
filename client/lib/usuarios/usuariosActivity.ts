
import {application, dependency, defineActivity} from '../../lib/himba'
import {rolesNames} from '../../db/db'

export var usuariosActivity = defineActivity({
  name: 'usuarios',
  title: () => 'Usuários',
  icon: () => 'person',
  roles: [],
  actions() {
    return [
      {
        title: () => 'Esqueci senha',
        icon: () => 'help-circle',
        roles: [],
        kind: () => "primary",
        fab: () => true,
        execute() {}
      },
    ];
  }
});

import './usuariosView.imba'
import './usuarioForm.imba'
