import { loadConfig } from "config-decorators";
import { SysConfig } from "./sys.config";
import { Environment } from "../infraestructure/config/environment";
import { DbConfig } from "./db.config";

export class AppConfig {
  public readonly env = Environment.get();

  public readonly app = loadConfig(SysConfig);

  public readonly db = loadConfig(DbConfig);
}

export const config = loadConfig(AppConfig);
