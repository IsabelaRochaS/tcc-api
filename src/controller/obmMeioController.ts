import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { OBMMeioService } from "../services/obmmeio.service";
import { OBMMeio } from "../entities/obmmeio.entity";
import { Cba_per_typeView } from "../view/cba_per_type.view";

@ApiTags("OBM Meio")
@Controller("/app")
export class OBMMeioController {
  public constructor(private readonly obmMeioService: OBMMeioService) {}

  @ApiResponse({
    status: 200,
  })
  @Post("/importOBMMeioData")
  public importOBMMeioData(): Promise<(Partial<OBMMeio> & OBMMeio)[]> {
    return this.obmMeioService.injectOBMMeioData();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "type",
    type: String,
    description: "sigla opcional.",
    required: false,
  })
  @Get("/getOBMMeio")
  public getOBMMeio(
    @Query("type") type?: string
  ): Promise<(Partial<OBMMeio> & OBMMeio)[]> {
    return this.obmMeioService.getAll(type);
  }

  @ApiResponse({
    status: 200,
  })
  @Get("/getCBAByAbbreviations")
  public getByAbbreviations(): Promise<
    (Partial<Cba_per_typeView> & Cba_per_typeView)[]
  > {
    return this.obmMeioService.getPerType();
  }
}
