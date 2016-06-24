import {dependency} from '../lib/himba'
import {Usuario} from './usuario'

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
      }
      else {
        _usuario = null;
        _resumeToken = '';
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
