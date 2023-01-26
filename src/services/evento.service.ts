import { Injectable } from "@nestjs/common";
import csv from "csvtojson";
import { SubtipoEvento } from "../entities/subtipoEvento.entity";
import { EventoRepository } from "../repository/evento.repository";
import { Evento } from "../entities/evento.entity";
import { EventoDto } from "../dto/evento.dto";
import { TipoEventoRepository } from "../repository/tipo-evento.repository";
import { SubtipoEventoRepository } from "../repository/subtipo-evento.repository";
import { MunicipioRepository } from "../repository/municipio.repository";
import { Municipio } from "../entities/municipio.entity";
import { TipoEvento } from "../entities/tipoEvento.entity";

@Injectable()
export class EventoService {
  public constructor(
    private readonly eventoRepository: EventoRepository,
    private readonly tipoEventoRepository: TipoEventoRepository,
    private readonly subtipoEventoRepository: SubtipoEventoRepository,
    private readonly municipioRepository: MunicipioRepository
  ) {}

  public async injectEventoData(file: string): Promise<Partial<Evento>[]> {
    const eventoDtos: EventoDto[] = await csv().fromFile(
      `./src/dataToInject/${file}`
    );

    const tiposEvento = await this.tipoEventoRepository.findAll();
    const subtiposEvento = await this.subtipoEventoRepository.findAll();
    const municipios = await this.municipioRepository.findAll();

    const eventos: Partial<Evento>[] = this.getEvento(
      eventoDtos,
      tiposEvento,
      subtiposEvento,
      municipios
    );

    eventos.forEach((evento) => this.eventoRepository.save(evento));

    return [];
  }

  public async getAll(pag: number, take: number) {
    const result = await this.eventoRepository.findAllPag(pag, take);
    return result[0];
  }

  private getEvento(
    eventoDtos: EventoDto[],
    tiposEvento: TipoEvento[],
    subtiposEvento: SubtipoEvento[],
    municipios: Municipio[]
  ): Partial<Evento>[] {
    return eventoDtos.map((eventoDto) => {
      const evento = EventoDto.convert(eventoDto);

      const tipoEvento = tiposEvento.find((tipoEvento) => {
        if (tipoEvento.tipo == eventoDto.Tipo.toLowerCase()) {
          return tipoEvento.id;
        }
      });

      const subtipoEvento = subtiposEvento.find((subtipoEvento) => {
        if (subtipoEvento.subtipo == eventoDto.Subtipo.toLowerCase()) {
          return subtipoEvento.id;
        }
      });

      const municipio = municipios.find((municipio) => {
        if (municipio.nome == eventoDto.Municipio.toLowerCase()) {
          return municipio.id;
        }
      });

      evento.tipoEvento_id = tipoEvento ? tipoEvento.id : undefined;
      evento.subtipoEvento_id = subtipoEvento ? subtipoEvento.id : undefined;
      evento.municipio_id = municipio ? municipio.id : undefined;

      return evento;
    });
  }

  public chunk(items, size) {
    const chunks = [];

    while (items.length) {
      chunks.push(items.splice(0, size));
    }

    return chunks;
  }
}
