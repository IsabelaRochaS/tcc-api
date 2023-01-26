import { ENV } from "config-decorators";

export class DbConfig {
  @ENV("TYPEORM_HOST", true)
  public host!: string;

  @ENV("TYPEORM_USERNAME", true)
  public username!: string;

  @ENV("TYPEORM_PASSWORD", true)
  public password!: string;
}
