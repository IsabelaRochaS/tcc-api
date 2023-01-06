import { Injectable } from "@nestjs/common";
import csv from "csvtojson";
import { TipoEvento } from "../entities/tipoEvento.entity";
import { SubtipoEventoDto } from "../dto/subtipoEvento.dto";
import { SubtipoEvento } from "../entities/subtipoEvento.entity";
import { SubtipoEventoRepository } from "../repository/subtipo-evento.repository";
import { TipoEventoRepository } from "../repository/tipo-evento.repository";

@Injectable()
export class SubtipoEventoService {
  public constructor(
    private readonly tipoEventoRepository: TipoEventoRepository,
    private readonly subtipoEventoRepository: SubtipoEventoRepository
  ) {}

  public async injectSubtipoEventoData(): Promise<Partial<TipoEvento>[]> {
    const subtipoEventoDtos: SubtipoEventoDto[] = await csv().fromFile(
      "./src/dataToInject/subtipoEvento.csv"
    );

    const subtipoEvento: Partial<SubtipoEvento>[] = await this.getSubtipoEvento(
      subtipoEventoDtos
    );

    return this.subtipoEventoRepository.saveAll(subtipoEvento);
  }

  private async getSubtipoEvento(
    subtipoEventoDtos: SubtipoEventoDto[]
  ): Promise<Partial<SubtipoEvento>[]> {
    const tiposEvento = await this.tipoEventoRepository.findAll();

    return subtipoEventoDtos.map((subtipoEventoDto) => {
      const subtipoEvento = SubtipoEventoDto.convert(subtipoEventoDto);

      const tipoEvento = tiposEvento.find((tipoEvento) => {
        if (tipoEvento.tipo == subtipoEventoDto.TIPO.toLowerCase()) {
          return tipoEvento.id;
        }
      });

      subtipoEvento.tipoEvento_id = tipoEvento ? tipoEvento.id : undefined;

      return subtipoEvento;
    });
  }
}
