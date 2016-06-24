import {Usuario, Funcao} from './usuario'

export interface Posto {
  id: string;
  nome: string;
  plantoesDefinidos: {
    desdeAno: number;
    plantoes: Plantao[]
  }[]
}

export interface PostoAno {
  id: string;
  postoId(): string;
  ano(): number;
  pessoal: PostoPessoa[];

}

export interface Plantao {
  id: string;
  inicio: number;
  fim: number
}

export interface PostoPessoa {
  usuario: Usuario;
  grupo: number;
  funcoes: string;
  plantao: string;
  participacoes: {
    plantoes: { data: Date; plantao: string }[],
    rgs: { data: Date, vida_plena: boolean, feedbacks: number, vivencias: number }[],
    rgvs: { data: Date }[],
    reciclagens: { data: Date }[]
  }
}
