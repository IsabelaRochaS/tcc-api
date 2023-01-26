import {MigrationInterface, QueryRunner} from "typeorm";

export class NovaTabelaTipoEvento1671576536025 implements MigrationInterface {
    name = 'NovaTabelaTipoEvento1671576536025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoEvento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying NOT NULL, "tipo_codigo" character varying NOT NULL, CONSTRAINT "PK_b25b2196afbc3624a2e8e14d502" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipoEvento"`);
    }

}
