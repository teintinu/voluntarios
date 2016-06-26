
import {db} from './db';

export interface Projeto {
  id: string;
  participantes: {
    usuarioId: String,
    dono: boolean
  }[],
  tarefa: {
    titulo: string,
    descricao: string,
    responsavelId: String,
    data_previsao: Date,
    data_realizacao: Date
  }
}
