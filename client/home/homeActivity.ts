
import {dependency, defineActivity} from '../lib/himba'

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
  state() {
    return teste;
  },
  actions() {
    return [
      {
        title: () => 'zero',
        icon: () => 'add',
        visible: () => true,
        enabled: () => true,
        execute() {
          teste.set(0);
        }
      },
      {
        title: () => '1000',
        icon: () => 'add',
        visible: () => true,
        enabled: () => true,
        execute() {
          teste.set(1000);
        }
      },
      {
        title: () => '10000',
        icon: () => 'add',
        visible: () => true,
        enabled: () => true,
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
