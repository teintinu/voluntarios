import {dependency} from '../lib/himba'

import {Usuario} from './usuario'
import {db, rolesNames} from './db'
import {RoleID} from '../lib/himbaSchema'

export interface Sessao {

  usuario: Usuario,
  resumeToken: string,
  setarDadosDeLogin(usuario: Usuario, resumeToken: string)
}

export function criarSessaoDeLogin() {

  var _dep = dependency();
  var _usuario: Usuario = null;
  var _resumeToken = '';

  var sessao: Sessao = {
    setarDadosDeLogin(usuario: Usuario, resumeToken: string) {
      if (usuario && resumeToken) {
        _usuario = usuario;
        _resumeToken = resumeToken;
        aplicarPermissoes(usuario.roles);
      }
      else {
        _usuario = null;
        _resumeToken = '';
        aplicarPermissoes([])
      }
      _dep.changed();
    }
  } as Sessao

  Object.defineProperties(sessao, {
    usuario: {
      get() {
        _dep.depend();
        return _usuario;
      }
    },
    resumeToken: {
      get() {
        _dep.depend();
        return _resumeToken;
      }
    }
  });
  return sessao;
}

function aplicarPermissoes(roles: number[]) {
  debugger
  (Object.keys(rolesNames)).forEach(function(s) {
    var r = rolesNames[s];
    db.role[r.name] = roles.indexOf(r.value) >= 0;
  });
}
