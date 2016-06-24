export interface Usuario {
  id: string;
  nome: string;
  funcoes: Funcao[]
}

export enum Funcao {
  voluntario = 1,
  coordenadorGrupo = 10,
  viceCoordenadorGrupo = 11,
  secretarioPosto = 20,
  coordenadorPosto = 30,
  viceCoordenadorPosto = 31,
  root = 1000,
}
