import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { TipoEvento } from "../entities/tipoEvento.entity";
import { TipoEventoService } from "../services/tipo-evento.service";

@ApiTags("Tipo Evento")
@Controller("/app")
export class TipoEventoController {
  public constructor(private readonly tipoEventoService: TipoEventoService) {}

  @ApiResponse({
    status: 200,
  })
  @Post("/importTipoEvento")
  public importTipoEvento(): Promise<Partial<TipoEvento>[]> {
    return this.tipoEventoService.injectTipoEventoData();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "codigo",
    type: String,
    description: "codigo do tipo",
    required: false,
  })
  @ApiQuery({
    name: "tipo",
    type: String,
    description: "nome do tipo de evento",
    required: false,
  })
  @Get("/getTipoEvento")
  public getTipoEvento(
    @Query("codigo") codigo?: string,
    @Query("tipo") tipo?: string
  ): Promise<Partial<TipoEvento>[]> {
    return this.tipoEventoService.getTipoEvento(codigo, tipo);
  }
}
