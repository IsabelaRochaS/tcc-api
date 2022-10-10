import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthService } from "./health.service";

@ApiTags("default")
@Controller("/health_check")
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @ApiResponse({
    status: 200,
    type: String,
    description: "Used by Kubernetes to know if application is up",
  })
  @Get("/")
  public async getHealth(): Promise<string> {
    return this.healthService.verifyServiceHealth();
  }
}
