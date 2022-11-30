import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { OBMFimService } from "../services/obmfim.service";
import { OBMFim } from "../entities/obmfim.entity";
import { Obmfim_per_typeView } from "../view/obmfim_per_type.view";

@ApiTags("OBM Fim")
@Controller("/app")
export class OBMFimController {
  public constructor(private readonly obmFimService: OBMFimService) {}

  @ApiResponse({
    status: 200,
  })
  @Post("/importOBMFimData")
  public importOBMFimData(): Promise<(Partial<OBMFim> & OBMFim)[]> {
    return this.obmFimService.injectOBMFimData();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "type",
    type: String,
    description: "tipo opcional. [DBM, GBM]",
    required: false,
  })
  @Get("/getOBMFim")
  public getOBMMeio(
    @Query("type") type?: string
  ): Promise<(Partial<OBMFim> & OBMFim)[]> {
    return this.obmFimService.getAll(type);
  }

  @ApiResponse({
    status: 200,
  })
  @Get("/getByAbbreviations")
  public getByAbbreviations(): Promise<
    (Partial<Obmfim_per_typeView> & Obmfim_per_typeView)[]
  > {
    return this.obmFimService.getPerType();
  }
}
