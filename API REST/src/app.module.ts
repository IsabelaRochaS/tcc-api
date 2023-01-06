import { Module, OnModuleDestroy } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MunicipioController } from "./controller/municipioController";
import { MunicipioService } from "./services/municipio.service";
import { ConfigModule } from "./infraestructure/config/config.module";
import { ExceptionFilterModule } from "./infraestructure/exception-filter/exception-filter.module";
import { Environment } from "./infraestructure/config/environment";
import { HealthModule } from "./infraestructure/health/health.module";
import { defaultConfig } from "./ormconfig";
import { Municipio } from "./entities/municipio.entity";
import { OBMMeio } from "./entities/obmmeio.entity";
import { OBMFim } from "./entities/obmfim.entity";
import { Viaturas } from "./entities/viaturas.entity";
import { MunicipioRepository } from "./repository/municipio.repository";
import { OBMMeioService } from "./services/obmmeio.service";
import { OBMMeioRepository } from "./repository/obmmeio.repository";
import { OBMMeioController } from "./controller/obmMeioController";
import { OBMFimService } from "./services/obmfim.service";
import { OBMFimRepository } from "./repository/obmfim.repository";
import { OBMFimController } from "./controller/obmFimController";
import { TipoEvento } from "./entities/tipoEvento.entity";
import { TipoEventoService } from "./services/tipo-evento.service";
import { TipoEventoRepository } from "./repository/tipo-evento.repository";
import { TipoEventoController } from "./controller/tipoEventoController";
import { SubtipoEvento } from "./entities/subtipoEvento.entity";
import { SubtipoEventoController } from "./controller/subtipoEventoController";
import { SubtipoEventoService } from "./services/subtipo-evento.service";
import { SubtipoEventoRepository } from "./repository/subtipo-evento.repository";

@Module({
  imports: [
    TypeOrmModule.forRoot(defaultConfig),
    TypeOrmModule.forFeature([
      Municipio,
      OBMFim,
      OBMMeio,
      Viaturas,
      TipoEvento,
      SubtipoEvento,
    ]),
    ConfigModule,
    HealthModule,
    ExceptionFilterModule,
  ],
  controllers: [
    MunicipioController,
    OBMMeioController,
    OBMFimController,
    TipoEventoController,
    SubtipoEventoController,
  ],
  providers: [
    MunicipioService,
    MunicipioRepository,
    OBMMeioService,
    OBMMeioRepository,
    OBMFimService,
    OBMFimRepository,
    TipoEventoService,
    TipoEventoRepository,
    SubtipoEventoService,
    SubtipoEventoRepository,
  ],
})
export class AppModule implements OnModuleDestroy {
  private readonly WAIT_MS_BEFORE_SHUTDOWN = 15_000;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() {}

  // This will be called when application is shutting down. The idea is to wait a while
  // before proceeding with the shutdown, to give Kubernetes some time to properly stop
  // sending traffic to this host and therefore avoid downtime.
  public async onModuleDestroy(): Promise<void> {
    if (!Environment.isDevelopment()) {
      // this.logger.info(
      //     `Application is being terminated. Will wait ${this.WAIT_MS_BEFORE_SHUTDOWN}ms before shutting down.`,
      // );

      await new Promise((resolve) =>
        setTimeout(resolve, this.WAIT_MS_BEFORE_SHUTDOWN)
      );

      // this.logger.info('Wait is done, shutting down now...');
    }
  }
}
