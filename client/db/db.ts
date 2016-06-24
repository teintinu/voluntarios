import {application, dependency} from '../lib/himba'
import {RoleID} from '../lib/himbaSchema'

import {LoginWithPassword} from '../lib/login/loginWithPassword'
import {LoginWithGoogle} from '../lib/login/loginWithGoogle'
import {LoginWithFacebook} from '../lib/login/loginWithFacebook'
import {Usuario} from './usuario'
import {Sessao, criarSessaoDeLogin} from './sessao'
import {Agenda, criarAgenda} from './agenda'

export var db = {
  sessao: criarSessaoDeLogin(),
  agenda: criarAgenda(),
  loginWithPassword(usuario: string, senha: string) {
    application.loginWith(new LoginWithPassword(usuario, senha))
  },
  loginWithFacebook() {
    application.loginWith(new LoginWithFacebook('123'))
  },
  loginWithGoogle(){
    application.loginWith(new LoginWithGoogle('1234'))
  },
  role: {
    coordenadorDePosto: () => false,
    viceCoordenadorDePosto: () =>false,
    coordenadorDeGrupo: () => false,
    viceCoordenadorDeGrupo: () => false,
    secretario: () => false,
    voluntario: () => false,
    root: () => false
  }
};

export var rolesNames = {
  coordenadorDePosto: { value: 1, title: 'Coordenador de posto' } as RoleID,
  viceCoordenadorDePosto: { value: 2, title: 'Vice-coordenador de posto' } as RoleID,
  coordenadorDeGrupo: { value: 3, title: 'Coordenador de grupo' } as RoleID,
  viceCoordenadorDeGrupo: { value: 4, title: 'Vice-coordenador de grupo' } as RoleID,
  secretario: { value: 5, title: 'Secretário de posto' } as RoleID,
  voluntario: { value: 6, title: 'Voluntário' } as RoleID,
  root: { value: 7, title: '' } as RoleID,
}

export function voluntarioLogado() {
  return {
    RG: {
      realizadas: 8,
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
    ]
  }
}

