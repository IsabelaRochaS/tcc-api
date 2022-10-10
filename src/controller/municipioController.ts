import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { MunicipioService } from "../services/municipio.service";
import { Mesoregiao, Municipio } from "../entities/municipio.entity";

@ApiTags("Municipio")
@Controller("/app")
export class MunicipioController {
  public constructor(private readonly municipioService: MunicipioService) {}

  @ApiResponse({
    status: 200,
  })
  @Post("/importMunicipioData")
  public importMunicipioData(): Promise<(Partial<Municipio> & Municipio)[]> {
    return this.municipioService.injectMunicipioData();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: "mesoregiao",
    type: String,
    description:
      "Mesoregião opcional. [Sul Fluminense, Norte Fluminense, Noroeste Fluminense, Centro Fluminense, Metropolitana do Rio de Janeiro, Baixadas]",
    required: false,
  })
  @Get("/getMunicipio")
  public getMunicipio(
    @Query("mesoregiao") mesoregiao?: Mesoregiao
  ): Promise<(Partial<Municipio> & Municipio)[]> {
    return this.municipioService.getMunicipio(mesoregiao);
  }
}
