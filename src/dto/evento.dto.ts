import { Evento } from "../entities/evento.entity";
import { maskSensitive } from "../helpers/helpers";

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
  Endereco: string;
  Latitude: string;
  Longitude: string;

  public static convert = (eventoDto: EventoDto): Partial<Evento> => {
    let evento = {
      idEvento: eventoDto.IdEvento,
      ocorrencia: maskSensitive(eventoDto.Ocorrencia),
      dataCriacao: eventoDto.DataCriacao,
      agencia: eventoDto.Agencia,
      operacao: eventoDto.Operacao,
      cba: eventoDto.CBA,
      grupamentoCodigo: maskSensitive(eventoDto.GrupamentoCodigo),
      grupamento: maskSensitive(eventoDto.Grupamento),
      categoria: eventoDto.Categoria.toLowerCase(),
      situacao: maskSensitive(eventoDto.Situacao.toLowerCase()),
      endereco: maskSensitive(eventoDto.Endereco.toLowerCase()),
      latitude: maskSensitive(eventoDto.Latitude.toLowerCase()),
      longitude: maskSensitive(eventoDto.Longitude.toLowerCase()),
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
