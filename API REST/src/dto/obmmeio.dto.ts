import { OBMMeio } from "../entities/obmmeio.entity";

export class OBMMeioDto {
  OBM_NOMECOMPLETO: string;
  CBA: string;
  ENDEREÇO: string;
  Nº: string;
  BAIRRO: string;
  MUNICÍPIO: string;
  CEP: string;
  LONGITUDDE: number;
  LATITUDE: number;
  DATA_DE_CRIAÇÃO: string;

  public static convert = (obmMeioDto: OBMMeioDto): Partial<OBMMeio> => {
    const str = obmMeioDto.DATA_DE_CRIAÇÃO;

    const [day, month, year] = str.split("/");
    const date = new Date(+year, +month - 1, +day);

    return {
      nome: obmMeioDto.OBM_NOMECOMPLETO.toLowerCase(),
      sigla: obmMeioDto.CBA.toUpperCase(),
      logradouro: obmMeioDto.ENDEREÇO.toLowerCase(),
      numero: obmMeioDto.Nº,
      bairro: obmMeioDto.BAIRRO.toLowerCase(),
      CEP: obmMeioDto.CEP,
      coordX: obmMeioDto.LONGITUDDE,
      coordY: obmMeioDto.LATITUDE,
      dataCriacao: date,
    };
  };
}
