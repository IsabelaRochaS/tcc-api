import {MigrationInterface, QueryRunner} from "typeorm";

export class NovaTabelaSubtipoEvento1671580485312 implements MigrationInterface {
    name = 'NovaTabelaSubtipoEvento1671580485312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "eventos" ("id" SERIAL NOT NULL, "ocorrencia" character varying NOT NULL, "data_criacao" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_40d4a3c6a4bfd24280cb97a509e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "municipio_mesoregiao_enum" AS ENUM('Sul Fluminense', 'Norte Fluminense', 'Noroeste Fluminense', 'Centro Fluminense', 'Metropolitana do Rio de Janeiro', 'Baixadas')`);
        await queryRunner.query(`CREATE TABLE "municipio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "populacao_estimada" character varying, "area_km2" character varying, "densidade_populacional" character varying, "pib_per_capita" character varying, "idhm" character varying, "cod_ibge" character varying, "mesoregiao" "municipio_mesoregiao_enum" NOT NULL, CONSTRAINT "PK_74346041a3332b7880d76c610f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UX_MUNICIPIO_NAME" ON "municipio" ("nome") `);
        await queryRunner.query(`CREATE TABLE "obmmeio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" character varying NOT NULL, "logradouro" character varying NOT NULL, "numero" character varying NOT NULL, "bairro" character varying NOT NULL, "municipio_id" uuid NOT NULL, "cep" character varying NOT NULL, "coordX" real NOT NULL, "coordY" real NOT NULL, "estaAtivo" boolean DEFAULT true, "data_criacao" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_867f579882994d28441c1e5f2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "FK_OBMMEIO_MUNICIPIO" ON "obmmeio" ("municipio_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UX_OBMMEIO_SIGLA" ON "obmmeio" ("sigla") `);
        await queryRunner.query(`CREATE TABLE "obmfim" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" character varying, "logradouro" character varying, "numero" character varying, "bairro" character varying, "pop_area_op" character varying, "area_km2" character varying, "densidade_demo_hab_km2" character varying, "municipio_id" uuid, "cep" character varying, "coordX" real, "coordY" real, "estaAtivo" boolean NOT NULL DEFAULT true, "obmmeio_id" uuid NOT NULL, "data_criacao" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_37677b15a0f154d4283d76b0d64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "FK_OBMMFIM_MUNICIPIO" ON "obmfim" ("municipio_id") `);
        await queryRunner.query(`CREATE INDEX "FK_OBMFIM_OBMMEIO" ON "obmfim" ("obmmeio_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UX_OBMFIM_SIGLA" ON "obmfim" ("sigla") `);
        await queryRunner.query(`CREATE TABLE "subtipoEvento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtipo" character varying NOT NULL, "tipoEvento_id" uuid, CONSTRAINT "PK_94ccf68c0b698b736de2a10ae63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "FK_TIPOEVENTO_SUBTIPOEVENTO" ON "subtipoEvento" ("tipoEvento_id") `);
        await queryRunner.query(`CREATE TABLE "tipoEvento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying NOT NULL, "tipo_codigo" character varying NOT NULL, CONSTRAINT "PK_b25b2196afbc3624a2e8e14d502" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "viaturas_sigla_enum" AS ENUM('ABC')`);
        await queryRunner.query(`CREATE TYPE "viaturas_finalidade_enum" AS ENUM('ABC')`);
        await queryRunner.query(`CREATE TABLE "viaturas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "sigla" "viaturas_sigla_enum" NOT NULL, "finalidade" "viaturas_finalidade_enum" NOT NULL, CONSTRAINT "PK_06a82d2210113068cb6e1043ab7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "obmmeio" ADD CONSTRAINT "FK_6e7fea7d9cb51b1afafd6b32147" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "obmfim" ADD CONSTRAINT "FK_d2eb7c058c0855be83939b768be" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "obmfim" ADD CONSTRAINT "FK_35713ba28008ab1b0689c6a39b1" FOREIGN KEY ("obmmeio_id") REFERENCES "obmmeio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtipoEvento" ADD CONSTRAINT "FK_9a0e7b873683ceb5acb91139071" FOREIGN KEY ("tipoEvento_id") REFERENCES "subtipoEvento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtipoEvento" DROP CONSTRAINT "FK_9a0e7b873683ceb5acb91139071"`);
        await queryRunner.query(`ALTER TABLE "obmfim" DROP CONSTRAINT "FK_35713ba28008ab1b0689c6a39b1"`);
        await queryRunner.query(`ALTER TABLE "obmfim" DROP CONSTRAINT "FK_d2eb7c058c0855be83939b768be"`);
        await queryRunner.query(`ALTER TABLE "obmmeio" DROP CONSTRAINT "FK_6e7fea7d9cb51b1afafd6b32147"`);
        await queryRunner.query(`DROP TABLE "viaturas"`);
        await queryRunner.query(`DROP TYPE "viaturas_finalidade_enum"`);
        await queryRunner.query(`DROP TYPE "viaturas_sigla_enum"`);
        await queryRunner.query(`DROP TABLE "tipoEvento"`);
        await queryRunner.query(`DROP INDEX "FK_TIPOEVENTO_SUBTIPOEVENTO"`);
        await queryRunner.query(`DROP TABLE "subtipoEvento"`);
        await queryRunner.query(`DROP INDEX "UX_OBMFIM_SIGLA"`);
        await queryRunner.query(`DROP INDEX "FK_OBMFIM_OBMMEIO"`);
        await queryRunner.query(`DROP INDEX "FK_OBMMFIM_MUNICIPIO"`);
        await queryRunner.query(`DROP TABLE "obmfim"`);
        await queryRunner.query(`DROP INDEX "UX_OBMMEIO_SIGLA"`);
        await queryRunner.query(`DROP INDEX "FK_OBMMEIO_MUNICIPIO"`);
        await queryRunner.query(`DROP TABLE "obmmeio"`);
        await queryRunner.query(`DROP INDEX "UX_MUNICIPIO_NAME"`);
        await queryRunner.query(`DROP TABLE "municipio"`);
        await queryRunner.query(`DROP TYPE "municipio_mesoregiao_enum"`);
        await queryRunner.query(`DROP TABLE "eventos"`);
    }

}
