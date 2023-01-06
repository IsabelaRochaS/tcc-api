import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

type Config = {
  endpoint: string;
  title: string;
  description: string;
  version: string;
};

export class SwaggerModuleInjector {
  public constructor(private readonly config: Config) {}

  public inject(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle(this.config.title)
      .setDescription(this.config.description)
      .setVersion(this.config.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(this.config.endpoint, app, document);
  }
}
