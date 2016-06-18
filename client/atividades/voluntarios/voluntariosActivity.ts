
import {application, dependency, defineActivity} from '../lib/himba'
import {lista_voluntarios} from '../db/db'

export var voluntariosActivity = defineActivity({
  name: 'voluntarios',
  title: () => 'Voluntários',
  icon: () => 'person',
  state() {
    return {
      lista_voluntarios() {
        var filtro = application.searchText;
        var ret = lista_voluntarios();
        if (filtro)
          ret = ret.filterWithRelevance((v) => v['nome'].l_relevance(filtro));
        return ret;
      }
    };
  },
  actions() {
    return [];
  }
});

import './voluntariosView.imba'
