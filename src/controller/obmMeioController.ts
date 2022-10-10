import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Post } from "@nestjs/common";
import { OBMMeioService } from "../services/obmmeio.service";
import { OBMMeio } from "../entities/obmmeio.entity";

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
}
