
import {db, rolesNames} from './db';

export interface Usuario {
  id: string;
  emails: {
    endereco: string,
    confirmado: boolean,
    ativo: boolean
  },
  avatar: string;
  servicos: string[];
  nome: string;
  roles: number[];
}

export function qryUsuarioPorEmail(email: string): Usuario {
  var u: Usuario
  if (email == 'ana@teste') {
    u={
      id: '1',
      nome: 'ana',
      avatar: null,
      servicos: ['password'],
      emails: {
        endereco: 'ana@teste',
        confirmado: true,
        ativo: true
      },
      roles: [rolesNames.voluntario.value]
    }
  }
  else if (email == 'messias@teste') {
    u={
      id: '2',
      nome: 'messias',
      avatar: null,
      servicos: ['password'],
      emails: {
        endereco: 'messias@teste',
        confirmado: true,
        ativo: true
      },
      roles: [rolesNames.secretario.value]
    }
  }
  else if (email == 'cristina@teste') {
    u={
      id: '3',
      nome: 'cristina',
      avatar: null,
      servicos: ['password'],
      emails: {
        endereco: 'cristina@teste',
        confirmado: true,
        ativo: true
      },
      roles: [rolesNames.coordenadorDePosto.value]
    }
  }
  return u;
}

