import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Post } from "@nestjs/common";
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
  //
  // @ApiResponse({
  //   status: 200,
  // })
  // @ApiQuery({
  //   name: "codigo",
  //   type: String,
  //   description: "codigo do tipo",
  //   required: false,
  // })
  // @ApiQuery({
  //   name: "tipo",
  //   type: String,
  //   description: "nome do tipo de evento",
  //   required: false,
  // })
  // @Get("/getSubtipoEvento")
  // public getTipoEvento(
  //   @Query("codigo") codigo?: string,
  //   @Query("tipo") tipo?: string
  // ): Promise<Partial<TipoEvento>[]> {
  //   return this.tipoEventoService.getTipoEvento(codigo, tipo);
  // }
}
