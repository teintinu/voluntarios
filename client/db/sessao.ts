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
      var roles: number[] = [];
      if (usuario && resumeToken) {
        _usuario = usuario;
        _resumeToken = resumeToken;
        roles = usuario.roles;
      }
      else {
        _usuario = null;
        _resumeToken = '';
      }
      _dep.changed();
      return roles;
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

