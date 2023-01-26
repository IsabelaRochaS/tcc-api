import { SubtipoEvento } from "../entities/subtipoEvento.entity";

export class SubtipoEventoDto {
  SUBTIPO: string;
  TIPO: string;

  public static convert = (
    subtipoEventoDto: SubtipoEventoDto
  ): Partial<SubtipoEvento> => {
    return {
      subtipo: subtipoEventoDto.SUBTIPO.toLowerCase(),
    };
  };
}
