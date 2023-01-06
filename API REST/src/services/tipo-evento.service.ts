import { Injectable } from "@nestjs/common";
import csv from "csvtojson";
import { FindConditions } from "typeorm";
import { TipoEventoRepository } from "../repository/tipo-evento.repository";
import { TipoEvento } from "../entities/tipoEvento.entity";
import { TipoEventoDto } from "../dto/tipoEvento.dto";

@Injectable()
export class TipoEventoService {
  public constructor(
    private readonly tipoEventoRepository: TipoEventoRepository
  ) {}

  public async injectTipoEventoData(): Promise<Partial<TipoEvento>[]> {
    const tipoEventoDtos: TipoEventoDto[] = await csv().fromFile(
      "./src/dataToInject/tipoEvento.csv"
    );

    const tipoEvento: Partial<TipoEvento>[] = tipoEventoDtos.map(
      (municipioDto) => {
        return TipoEventoDto.convert(municipioDto);
      }
    );

    return this.tipoEventoRepository.saveAll(tipoEvento);
  }

  public async getTipoEvento(codigo: string, tipo: string) {
    if (!codigo && !tipo) {
      return this.tipoEventoRepository.findAll();
    }

    if (codigo) {
      return await this.getTipoEventoByCodigo(codigo);
    }

    if (tipo) {
      return await this.getTipoEventoByTipo(tipo);
    }
  }

  public async getTipoEventoByCodigo(codigo: string) {
    const findConditions: FindConditions<TipoEvento> = {
      tipoCodigo: codigo,
    };
    return this.tipoEventoRepository.findByConditions(findConditions);
  }

  public async getTipoEventoByTipo(tipo: string) {
    const findConditions: FindConditions<TipoEvento> = {
      tipo: tipo,
    };
    return this.tipoEventoRepository.findByConditions(findConditions);
  }
}
