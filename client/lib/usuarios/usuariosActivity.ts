
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

export var usuarioFormAddActivity = defineActivity({
  name: 'usuarioFormAdd',
  title: () => 'Formula de cadastro de usuário',
  icon: () => 'person',
  roles: [],
  actions() {
    return [];
  }
});

import './usuarioFormAdd.imba'
