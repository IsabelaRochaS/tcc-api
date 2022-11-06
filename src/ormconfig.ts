import { ConnectionOptions } from "typeorm";
import { config } from "./config/app.config";

export const defaultConfig: ConnectionOptions = {
  type: "postgres",
  host: config.db.host,
  port: 5432,
  username: config.db.username,
  password: config.db.password,
  database: "firefighter",
  migrationsTableName: "orm_migrations_firefighter",
  migrationsTransactionMode: "none",
  migrations: ["src/migration/*.{ts,js}"],
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  subscribers: ["/src/**/*.subscriber.ts"],
  cli: {
    migrationsDir: "src/migration",
  },
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  synchronize: true,
  logging: ["error", "schema"],
  maxQueryExecutionTime: 500,
};

// We could not keep the property within ConnectionOptions
export default [{ ...defaultConfig, keepConnectionAlive: true }];
