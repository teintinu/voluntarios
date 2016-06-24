
import {dependency, defineActivity} from '../../lib/himba'
import {rolesNames} from '../../db/db'

var teste = {
  _cont: 1,
  _dep: dependency(),
  cont() {
    this._dep.depend();
    return this._cont;
  },
  inc() {
    this._dep.changed();
    this._cont++;
  },
  set(v) {
    this._dep.changed();
    this._cont = v;
  }
};

export var homeActivity = defineActivity({
  name: 'home',
  title: () => 'Home',
  icon: () => 'home',
  roles: [],
  actions() {
    return [
      {
        title: () => 'zero',
        icon: () => 'add',
        roles: [],
        execute() {
          teste.set(0);
        }
      },
      {
        title: () => '1000',
        icon: () => 'add',
        roles: [rolesNames.voluntario],
        execute() {
          teste.set(1000);
        }
      },
      {
        title: () => '10000',
        icon: () => 'add',
        roles: [],
        execute() {
          teste.set(10000);
        }
      }
    ];
  }
  //  steps: [
  //   {
  //     name: 'bemvindo'
  //      render: do <homeView state=this.state >
  //    }
  // ]
});

import './homeView.imba';
