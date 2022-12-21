import { Injectable } from "@nestjs/common";
import { MunicipioRepository } from "../repository/municipio.repository";
import csv from "csvtojson";
import { OBMMeioRepository } from "../repository/obmmeio.repository";
import { OBMMeio } from "../entities/obmmeio.entity";
import { OBMMeioDto } from "../dto/obmmeio.dto";
import { FindConditions, Like } from "typeorm";
import { OBMFimService } from "./obmfim.service";
import { Cba_per_typeView } from "../view/cba_per_type.view";

@Injectable()
export class OBMMeioService {
  public constructor(
    private readonly obmMeioRepository: OBMMeioRepository,
    private readonly obmFimService: OBMFimService,
    private readonly municipioRepository: MunicipioRepository
  ) {}

  public async getAll(type: string) {
    if (!type) {
      return this.obmMeioRepository.findAll();
    }

    const findConditions: FindConditions<OBMMeio> = {
      sigla: Like(type),
    };
    return this.obmMeioRepository.findByConditions(findConditions);
  }

  public async getPerType() {
    const cbas = await this.obmMeioRepository.findAll();
    const listView: Cba_per_typeView[] = [];

    for (const value of cbas) {
      const obmfimPerTypeViews = await this.obmFimService.getPerType(value.id);

      const relations = new Cba_per_typeView(value.sigla, obmfimPerTypeViews);

      listView.push(relations);
    }

    return listView;
  }

  public async injectOBMMeioData(): Promise<(Partial<OBMMeio> & OBMMeio)[]> {
    const obmMeioDtos: OBMMeioDto[] = await csv().fromFile(
      "./src/dataToInject/cba.csv"
    );

    const OBMMeioArray: Partial<OBMMeio>[] = await this.getOBMMeio(obmMeioDtos);

    return this.obmMeioRepository.saveAll(OBMMeioArray);
  }

  private async getOBMMeio(
    obmMeiosDto: OBMMeioDto[]
  ): Promise<Partial<OBMMeio>[]> {
    const municipios = await this.municipioRepository.findAll();

    return obmMeiosDto.map((obmMeioDto) => {
      const obmMeio = OBMMeioDto.convert(obmMeioDto);

      const municipioIds = municipios.find((municipio) => {
        if (municipio.nome == obmMeioDto.MUNICÍPIO.toLowerCase()) {
          return municipio.id;
        }
      });

      obmMeio.municipio_id = municipioIds.id;

      return obmMeio;
    });
  }
}
