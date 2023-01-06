import { Injectable } from "@nestjs/common";
import { MunicipioRepository } from "../repository/municipio.repository";
import { Mesoregiao, Municipio } from "../entities/municipio.entity";
import csv from "csvtojson";
import { MunicipioDto } from "../dto/municipio.dto";
import { FindConditions } from "typeorm";

@Injectable()
export class MunicipioService {
  public constructor(
    private readonly municipioRepository: MunicipioRepository
  ) {}

  public async injectMunicipioData(): Promise<
    (Partial<Municipio> & Municipio)[]
  > {
    const municipiosDto: MunicipioDto[] = await csv().fromFile(
      "./src/dataToInject/municipiorj.csv"
    );

    const municipios: Partial<Municipio>[] = this.getMunicipios(municipiosDto);

    return this.municipioRepository.saveAll(municipios);
  }

  public async getMunicipio(mesoregiao: Mesoregiao) {
    if (!mesoregiao) {
      return this.municipioRepository.findAll();
    }

    const findConditions: FindConditions<Municipio> = {
      mesoregiao: mesoregiao,
    };
    return this.municipioRepository.findByConditions(findConditions);
  }

  private getMunicipios(municipiosDto: MunicipioDto[]): Partial<Municipio>[] {
    return municipiosDto.map((municipioDto) => {
      return MunicipioDto.convert(municipioDto);
    });
  }
}
