import { OBMFim } from "../entities/obmfim.entity";

export class OBMFimDto {
  OBM_NOMECOMPLETO: string;
  CBA: string;
  OBM: string;
  ENDEREÇO: string;
  Nº: string;
  BAIRRO: string;
  MUNICÍPIO: string;
  CEP: string;
  LONGITUDDE: number;
  LATITUDE: number;
  DATA_DE_CRIAÇÃO: string;
  POPULACAO_DENTRO_DA_AREA_OPERACIONAL_hab: string;
  DENSIDADE_DEMOGR_hab_km2: string;
  AREA_km2: string;

  public static convert = (obmFimDto: OBMFimDto): Partial<OBMFim> => {
    const str = obmFimDto.DATA_DE_CRIAÇÃO;
    let date: Date = new Date();

    if (str != "") {
      const [day, month, year] = str.split("/");
      date = new Date(+year, +month - 1, +day);
    }

    return {
      nome: obmFimDto.OBM_NOMECOMPLETO.toLowerCase(),
      sigla: obmFimDto.OBM.toUpperCase(),
      logradouro: obmFimDto.ENDEREÇO.toLowerCase(),
      popAreaOp: obmFimDto.POPULACAO_DENTRO_DA_AREA_OPERACIONAL_hab,
      areaKM2: obmFimDto.AREA_km2,
      densidadeDemoHabKM2: obmFimDto.DENSIDADE_DEMOGR_hab_km2,
      numero: obmFimDto.Nº,
      bairro: obmFimDto.BAIRRO.toLowerCase(),
      CEP: obmFimDto.CEP,
      coordX: Number(obmFimDto.LONGITUDDE),
      coordY: Number(obmFimDto.LATITUDE),
      dataCriacao: date,
    };
  };
}
