
import {application, dependency, defineActivity} from '../../lib/himba'
import {rolesNames} from '../../db/db'

export var voluntariosActivity = defineActivity({
  name: 'voluntarios',
  title: () => 'Voluntários',
  icon: () => 'person',
  roles: [rolesNames.voluntario, rolesNames.secretario],
  actions() {
    return [
      {
        title: () => 'Admissão',
        icon: () => 'add',
        roles: [rolesNames.secretario],
        execute() {
        }
      },
    ];
  }
});

import './voluntariosView.imba'
