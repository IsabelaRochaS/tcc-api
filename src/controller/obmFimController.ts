import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Post } from "@nestjs/common";
import { OBMFimService } from "../services/obmfim.service";
import { OBMFim } from "../entities/obmfim.entity";

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
}
