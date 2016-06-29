
import {application, dependency, defineActivity} from '../../lib/himba'
import {rolesNames} from '../../db/db'

export var usuariosActivity = defineActivity({
  name: 'usuarios',
  title: () => 'Usuários',
  icon: () => 'person',
  roles: [],
  actions() {
    return [];
  }
});

import './usuariosView.imba'
import './usuarioForm.imba'
