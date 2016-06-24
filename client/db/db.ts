import {application, dependency} from '../lib/himba'
import {LoginWithPassword} from '../lib/login/LoginWithPassword'
import {LoginWithGoogle} from '../lib/login/LoginWithGoogle'
import {LoginWithFacebook} from '../lib/login/LoginWithFacebook'
import {Usuario} from './usuario'
import {Sessao, criarSessaoDeLogin} from './sessao'
import {Agenda, criarAgenda} from './agenda'

export interface DB {
  sessao: Sessao;
  agenda: Agenda;
  loginWithPassword(usuario: string, senha: string);
  loginWithFacebook();
  loginWithGoogle();
}

export var db: DB = {
  sessao: criarSessaoDeLogin(),
  agenda: criarAgenda(),
  loginWithPassword(usuario: string, senha: string) {
    application.loginWith(new LoginWithPassword(usuario, senha))
  },
  loginWithFacebook() {
    application.loginWith(new LoginWithFacebook())
  },
  loginWithGoogle(){
    application.loginWith(new LoginWithGoogle())
  }
};


var sessao: Sessao = {} as Sessao

Object.defineProperties(sessao, {
  usuario: {
    get() {

    }
  }
});
export function login() {

}

export function voluntarioLogado() {
  dep.depend();
  return {
    RG: {
      realizadas: val,
      presencas: 6,
      faltas: 1,
      atendimentos: 5
    },
    RGV: {
      realizadas: 3,
      presencas: 2,
      faltas: 1
    },
    agenda: [
      {
        inicio: new Date(2016, 5, 23, 15, 0, 0),
        fim: new Date(2016, 5, 23, 19, 0, 0),
        descricao: 'Próximo plantão: P15/5',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      },
      {
        inicio: new Date(2016, 5, 26, 8, 0, 0),
        fim: new Date(2016, 5, 26, 11, 0, 0),
        descricao: 'RGV',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      },
      {
        inicio: new Date(2016, 6, 13, 19, 0, 0),
        fim: new Date(2016, 6, 13, 21, 0, 0),
        descricao: 'Reunião do grupo 4',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      }
    ]
  }
}

