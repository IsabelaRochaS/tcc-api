import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post } from "@nestjs/common";
import { SubtipoEventoService } from "../services/subtipo-evento.service";
import { SubtipoEvento } from "../entities/subtipoEvento.entity";

@ApiTags("Subtipo Evento")
@Controller("/app")
export class SubtipoEventoController {
  public constructor(
    private readonly subtipoEventoService: SubtipoEventoService
  ) {}

  @ApiResponse({
    status: 200,
  })
  @Post("/importSubtipoEvento")
  public importTipoEvento(): Promise<Partial<SubtipoEvento>[]> {
    return this.subtipoEventoService.injectSubtipoEventoData();
  }

  @ApiResponse({
    status: 200,
  })
  @Get("/getSubtipoEvento")
  public getSubtipoEvento(): Promise<Partial<SubtipoEvento>[]> {
    return this.subtipoEventoService.getAll();
  }
}
