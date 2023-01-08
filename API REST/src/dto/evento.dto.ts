import { Evento } from "../entities/evento.entity";

export class EventoDto {
  IdEvento: string;
  Ocorrencia: string;
  DataCriacao: Date;
  Agencia: string;
  Operacao: string;
  CBA: string;
  GrupamentoCodigo: string;
  Grupamento: string;
  Tipo: string;
  Subtipo: string;
  Categoria: string;
  Situacao: string;
  DataDespacho: Date;
  DataDeslocamento: Date;
  DataChegadaEvento: Date;
  DataFechamento: Date;
  Municipio: string;

  public static convert = (eventoDto: EventoDto): Partial<Evento> => {
    let evento = {
      idEvento: eventoDto.IdEvento,
      ocorrencia: eventoDto.Ocorrencia,
      dataCriacao: eventoDto.DataCriacao,
      agencia: eventoDto.Agencia,
      operacao: eventoDto.Operacao,
      cba: eventoDto.CBA,
      grupamentoCodigo: eventoDto.GrupamentoCodigo,
      grupamento: eventoDto.Grupamento,
      categoria: eventoDto.Categoria.toLowerCase(),
      situacao: eventoDto.Situacao.toLowerCase(),
    } as Partial<Evento>;

    evento = !isNaN(new Date(eventoDto.DataFechamento).valueOf())
      ? { ...evento, dataFechamento: eventoDto.DataFechamento }
      : evento;

    evento = !isNaN(new Date(eventoDto.DataDespacho).valueOf())
      ? { ...evento, dataDespacho: eventoDto.DataDespacho }
      : evento;

    evento = !isNaN(new Date(eventoDto.DataDeslocamento).valueOf())
      ? { ...evento, dataDeslocamento: eventoDto.DataDeslocamento }
      : evento;

    evento = !isNaN(new Date(eventoDto.DataChegadaEvento).valueOf())
      ? { ...evento, dataChegadaEvento: eventoDto.DataChegadaEvento }
      : evento;

    return evento;
  };
}
