import { Mesoregiao, Municipio } from "../entities/municipio.entity";

export class MunicipioDto {
  Nome_Municipio: string;
  Nome_Mesorregiao: string;
  codIBGE: string;

  public static convert = (municipioDto: MunicipioDto): Partial<Municipio> => {
    return {
      nome: municipioDto.Nome_Municipio.toLowerCase(),
      mesoregiao: municipioDto.Nome_Mesorregiao as Mesoregiao,
      codIBGE: municipioDto.codIBGE,
    };
  };
}
