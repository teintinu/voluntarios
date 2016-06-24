
export type Agenda = AgendaItem[] & {adicionarEvento()}

export function criarAgenda() {
  var a: Agenda = [] as Agenda;
  a.adicionarEvento = function() {

  }
}

export interface AgendaItem {
  inicio: Date,
  fim: Date,
  descricao: string;
  tipo: EventoTipo
}

export enum EventoTipo {
  Obrigatorio,
  Facultativo,
  Viagem
}

export enum EventoSituacao {
  SemConvite,
  SemResposta,
  Vai,
  NaoVai
}

