import { TipoEvento } from "../entities/tipoEvento.entity";

export class TipoEventoDto {
  TipoCodigo: string;
  Tipo: string;

  public static convert = (
    tipoEventoDto: TipoEventoDto
  ): Partial<TipoEvento> => {
    return {
      tipo: tipoEventoDto.Tipo.toLowerCase(),
      tipoCodigo: tipoEventoDto.TipoCodigo,
    };
  };
}
