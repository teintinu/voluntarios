import {Usuario} from './usuario'

export interface ReuniaoDeGrupo {
  presentes: Usuario[];
  ausentes: Usuario[];
  visitantes: Usuario[];
  preparacao: {
    realizado: boolean;
    inicio: Date;
  },
  resumoDoMes: {
    realizado: boolean;
    inicio: Date;
  },
  VidaPlena: {
    realizado: boolean;
    inicio: Date;
    por: Usuario
  },
  FeedBacks: {
    inicio: Date;
    ofereceu: Usuario;
    recebeu: Usuario
  }[],
  Vivencias: {
    inicio: Date;
    trouxe: Usuario;
    atendeu: Usuario
  }[],
  Avisos: {
    realizado: boolean;
    inicio: Date;
  },
  ProximaReuniao: {
    dataDaProximaReuniao: Date;
  }
}
