import { Injectable } from "@nestjs/common";
import { MunicipioRepository } from "../repository/municipio.repository";
import csv from "csvtojson";
import { OBMMeioRepository } from "../repository/obmmeio.repository";
import { OBMMeio } from "../entities/obmmeio.entity";
import { OBMMeioDto } from "../dto/obmmeio.dto";

@Injectable()
export class OBMMeioService {
  public constructor(
    private readonly obmMeioRepository: OBMMeioRepository,
    private readonly municipioRepository: MunicipioRepository
  ) {}

  public async injectOBMMeioData(): Promise<(Partial<OBMMeio> & OBMMeio)[]> {
    const obmMeioDtos: OBMMeioDto[] = await csv().fromFile(
      "./src/dataToInject/cba.csv"
    );

    const municipios: Partial<OBMMeio>[] = await this.getOBMMeio(obmMeioDtos);

    return this.obmMeioRepository.saveAll(municipios);
  }

  private async getOBMMeio(
    obmMeiosDto: OBMMeioDto[]
  ): Promise<Partial<OBMMeio>[]> {
    const municipios = await this.municipioRepository.findAll();

    return obmMeiosDto.map((obmMeioDto) => {
      const obmMeio = OBMMeioDto.convert(obmMeioDto);

      const municipioIds = municipios.filter((municipio) => {
        if (municipio.nome == obmMeioDto.MUNICÍPIO.toLowerCase()) {
          return municipio.id;
        }
      });

      obmMeio.municipio_id = municipioIds[0].id;

      return obmMeio;
    });
  }
}
