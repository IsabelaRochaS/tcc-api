import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1665358129705 implements MigrationInterface {
  name = "Tables1665358129705";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "municipio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "populacao_estimada" character varying, "area_km2" character varying, "densidade_populacional" character varying, "pib_per_capita" character varying, "idhm" character varying, "cod_ibge" character varying, "mesoregiao" "municipio_mesoregiao_enum" NOT NULL, CONSTRAINT "PK_74346041a3332b7880d76c610f3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UX_MUNICIPIO_NAME" ON "municipio" ("nome") `
    );
    await queryRunner.query(
      `CREATE TABLE "obmfim" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" character varying, "logradouro" character varying, "numero" character varying, "bairro" character varying, "municipio_id" uuid, "cep" character varying, "coordX" real, "coordY" real, "estaAtivo" boolean NOT NULL DEFAULT false, "obmmeio_id" uuid, "data_criacao" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_37677b15a0f154d4283d76b0d64" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "FK_OBMMFIM_MUNICIPIO" ON "obmfim" ("municipio_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "FK_OBMFIM_OBMMEIO" ON "obmfim" ("obmmeio_id") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UX_OBMFIM_SIGLA" ON "obmfim" ("sigla") `
    );
    await queryRunner.query(
      `CREATE TABLE "obmmeio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" character varying NOT NULL, "logradouro" character varying NOT NULL, "numero" character varying NOT NULL, "bairro" character varying NOT NULL, "municipio_id" uuid NOT NULL, "cep" character varying NOT NULL, "coordX" real NOT NULL, "coordY" real NOT NULL, "estaAtivo" boolean DEFAULT false, "data_criacao" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_867f579882994d28441c1e5f2f4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "FK_OBMMEIO_MUNICIPIO" ON "obmmeio" ("municipio_id") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UX_OBMMEIO_SIGLA" ON "obmmeio" ("sigla") `
    );
    await queryRunner.query(
      `CREATE TABLE "viaturas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" "viaturas_sigla_enum" NOT NULL, "finalidade" "viaturas_finalidade_enum" NOT NULL, CONSTRAINT "PK_06a82d2210113068cb6e1043ab7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "obmfim" ADD CONSTRAINT "FK_d2eb7c058c0855be83939b768be" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "obmfim" ADD CONSTRAINT "FK_35713ba28008ab1b0689c6a39b1" FOREIGN KEY ("obmmeio_id") REFERENCES "obmfim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "obmmeio" ADD CONSTRAINT "FK_6e7fea7d9cb51b1afafd6b32147" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "obmmeio" DROP CONSTRAINT "FK_6e7fea7d9cb51b1afafd6b32147"`
    );
    await queryRunner.query(
      `ALTER TABLE "obmfim" DROP CONSTRAINT "FK_35713ba28008ab1b0689c6a39b1"`
    );
    await queryRunner.query(
      `ALTER TABLE "obmfim" DROP CONSTRAINT "FK_d2eb7c058c0855be83939b768be"`
    );
    await queryRunner.query(`DROP TABLE "viaturas"`);
    await queryRunner.query(`DROP INDEX "UX_OBMMEIO_SIGLA"`);
    await queryRunner.query(`DROP INDEX "FK_OBMMEIO_MUNICIPIO"`);
    await queryRunner.query(`DROP TABLE "obmmeio"`);
    await queryRunner.query(`DROP INDEX "UX_OBMFIM_SIGLA"`);
    await queryRunner.query(`DROP INDEX "FK_OBMFIM_OBMMEIO"`);
    await queryRunner.query(`DROP INDEX "FK_OBMMFIM_MUNICIPIO"`);
    await queryRunner.query(`DROP TABLE "obmfim"`);
    await queryRunner.query(`DROP INDEX "UX_MUNICIPIO_NAME"`);
    await queryRunner.query(`DROP TABLE "municipio"`);
  }
}
