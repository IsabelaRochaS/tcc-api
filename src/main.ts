import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModuleInjector } from "./infraestructure/swagger/swagger-module.injector";
import { Environment } from "./infraestructure/config/environment";
import { UnhandledExceptionsFilter } from "./infraestructure/exception-filter/unhandled-exceptions.filter";
import { config } from "./config/app.config";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const exceptionFilter = app.get(UnhandledExceptionsFilter);

  app.useGlobalFilters(exceptionFilter);
  app.enableCors({
    credentials: true,
    origin: true,
  });

  if (!Environment.isProduction()) {
    const swaggerConfig = {
      endpoint: "swagger",
      title: config.app.name,
      description: "Boilerplate for NodeJS applications",
      version: "1.0",
    };

    const swaggerModuleInjector = new SwaggerModuleInjector(swaggerConfig);
    swaggerModuleInjector.inject(app);
  }

  // Enable shutdown hooks to have a graceful shutdown
  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
