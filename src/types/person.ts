export type PersonStatus = "DESAPARECIDO" | "LOCALIZADO";
export type PersonSex = "" | "MASCULINO" | "FEMININO" | undefined;

export interface Person {
  id: number;
  nome: string;
  idade?: number;
  sexo?: PersonSex;
  vivo?: boolean;
  urlFoto?: string;
  ultimaOcorrencia?: {
    dtDesaparecimento?: string;
    dataLocalizacao?: string;
    encontradoVivo?: boolean;
    localDesaparecimentoConcat?: string;
    ocorrenciaEntrevDesapDTO?: {
      informacao?: string;
      vestimentasDesaparecido?: string;
    };
  };
  listaCartaz?: Array<{
    urlCartaz: string;
    tipoCartaz: string;
  }>;
  ocoId?: number;
}

export interface PeopleResponse {
  content: Person[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}