import { Injectable } from "@nestjs/common";
import { MunicipioRepository } from "../repository/municipio.repository";
import csv from "csvtojson";
import { OBMMeioRepository } from "../repository/obmmeio.repository";
import { OBMFimRepository } from "../repository/obmfim.repository";
import { OBMFim } from "../entities/obmfim.entity";
import { OBMFimDto } from "../dto/obmfim.dto";
import { FindConditions, Like } from "typeorm";
import { Obmfim_per_typeView } from "../view/obmfim_per_type.view";
import { Abbreviations } from "../enums/abbreviations.enum";

@Injectable()
export class OBMFimService {
  public constructor(
    private readonly obmMeioRepository: OBMMeioRepository,
    private readonly obmFimRepository: OBMFimRepository,
    private readonly municipioRepository: MunicipioRepository
  ) {}

  public async getAll(type: string) {
    if (!type) {
      return this.obmFimRepository.findAll();
    }

    const findConditions: FindConditions<OBMFim> = {
      sigla: Like(`%${type}%`),
    };
    return this.obmFimRepository.findByConditions(findConditions);
  }

  public async getPerType(obmMeioId?: string) {
    const listView: Obmfim_per_typeView[] = [];
    for (const value in Abbreviations) {
      let findConditions: FindConditions<OBMFim> = {
        sigla: Like(`%${value}%`),
      };

      findConditions = obmMeioId
        ? { ...findConditions, obmMeio_id: obmMeioId }
        : findConditions;

      const returnedByAbb = await this.obmFimRepository.findByConditions(
        findConditions
      );

      const relations = new Obmfim_per_typeView(
        value,
        returnedByAbb.length.toString(),
        returnedByAbb
      );

      listView.push(relations);
    }

    return listView;
  }

  public async injectOBMFimData(): Promise<(Partial<OBMFim> & OBMFim)[]> {
    const obmFimDtos: OBMFimDto[] = await csv().fromFile(
      "./src/dataToInject/obmfim.csv"
    );

    const obmsFim: Partial<OBMFim>[] = await this.getOBMFim(obmFimDtos);

    return this.obmFimRepository.saveAll(obmsFim);
  }

  private async getOBMFim(obmsFimDto: OBMFimDto[]): Promise<Partial<OBMFim>[]> {
    const municipios = await this.municipioRepository.findAll();
    const obmsMeio = await this.obmMeioRepository.findAll();

    return obmsFimDto.map((obmFimDto) => {
      const obmFim = OBMFimDto.convert(obmFimDto);

      const municipioIds = municipios.filter((municipio) => {
        if (municipio.nome == obmFimDto.MUNICÍPIO.toLowerCase()) {
          return municipio.id;
        }
      });

      const obmMeioIds = obmsMeio.filter((obmMeio) => {
        if (obmMeio.sigla == obmFimDto.CBA) {
          return obmMeio.id;
        }
      });

      obmFim.obmMeio_id = obmMeioIds[0] ? obmMeioIds[0].id : undefined;
      obmFim.municipio_id = municipioIds[0] ? municipioIds[0].id : undefined;

      return obmFim;
    });
  }
}
