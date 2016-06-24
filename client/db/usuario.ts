
import {db, rolesNames} from './db';

export interface Usuario {
  id: string;
  nome: string;
  roles: number[]
}

export function qryUsuarioPorEmail(email: string): Usuario {
  var u: Usuario
  if (email = 'ana@teste') {
    u={
      id: '1',
      nome: 'ana',
      roles: [rolesNames.voluntario.value]
    }
  }
  else if (email = 'messias@teste') {
    u={
      id: '2',
      nome: 'messias',
      roles: [rolesNames.secretario.value]
    }
  }
  else if (email = 'cristina@teste') {
    u={
      id: '3',
      nome: 'cristina',
      roles: [rolesNames.coordenadorDePosto.value]
    }
  }
  return u;
}

