import { loadConfig } from "config-decorators";
import { SysConfig } from "./sys.config";
import { Environment } from "../infraestructure/config/environment";

export class AppConfig {
  public readonly env = Environment.get();

  public readonly app = loadConfig(SysConfig);
}
