import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { Evento } from "../entities/evento.entity";
import { EventoService } from "../services/evento.service";

@ApiTags("Evento")
@Controller("/app")
export class EventoController {
  public constructor(private readonly eventoService: EventoService) {}

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "arquivo",
    type: String,
    description: "nome do arquivo",
    required: true,
  })
  @Post("/importEvento")
  public importTipoEvento(
    @Query("arquivo") file?: string
  ): Promise<Partial<Evento>[]> {
    return this.eventoService.injectEventoData(file);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "pagina",
    type: String,
    description: "pagina",
    required: true,
  })
  @ApiQuery({
    name: "quantidade",
    type: String,
    description: "quantidade",
    required: true,
  })
  @Get("/getEvento")
  public getEvento(
    @Query("pagina") pagina?: number,
    @Query("quantidade") quantidade?: number
  ): Promise<Partial<Evento>[]> {
    return this.eventoService.getAll(pagina, quantidade);
  }
}
