import { MigrationInterface, QueryRunner } from "typeorm";

export class NovaTabelaEvento1672931803994 implements MigrationInterface {
  name = "NovaTabelaEvento1672931803994";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "evento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_evento" character varying NOT NULL, "ocorrencia" character varying NOT NULL, "data_criacao" TIMESTAMP WITH TIME ZONE NOT NULL, "agencia" character varying NOT NULL, "operacao" character varying NOT NULL, "cba" character varying NOT NULL, "grupamento" character varying NOT NULL, "grupamentoCodigo" character varying NOT NULL, "tipoEvento_id" uuid, "subtipoEvento_id" uuid, "categoria" character varying NOT NULL, "situacao" character varying NOT NULL, "data_despacho" TIMESTAMP WITH TIME ZONE NOT NULL, "data_deslocamento" TIMESTAMP WITH TIME ZONE NOT NULL, "data_chegadaEvento" TIMESTAMP WITH TIME ZONE NOT NULL, "data_fechamento" TIMESTAMP WITH TIME ZONE NOT NULL, "municipio_id" uuid NOT NULL, CONSTRAINT "PK_ceb2e9607555230aee6aff546b0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "FK_EVENTO_TIPOEVENTO" ON "evento" ("tipoEvento_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "FK_EVENTO_SUBTIPOEVENTO" ON "evento" ("subtipoEvento_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "FK_EVENTO_MUNICIPIO" ON "evento" ("municipio_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "evento" ADD CONSTRAINT "FK_0ba36e8b3d7018d5832e577634d" FOREIGN KEY ("tipoEvento_id") REFERENCES "tipoEvento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "evento" ADD CONSTRAINT "FK_d03706b58e9230d669739cd449e" FOREIGN KEY ("subtipoEvento_id") REFERENCES "subtipoEvento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "evento" ADD CONSTRAINT "FK_a7b7f53f7ba99bea127de265fd6" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evento" DROP CONSTRAINT "FK_a7b7f53f7ba99bea127de265fd6"`
    );
    await queryRunner.query(
      `ALTER TABLE "evento" DROP CONSTRAINT "FK_d03706b58e9230d669739cd449e"`
    );
    await queryRunner.query(
      `ALTER TABLE "evento" DROP CONSTRAINT "FK_0ba36e8b3d7018d5832e577634d"`
    );
    await queryRunner.query(`DROP INDEX "FK_EVENTO_MUNICIPIO"`);
    await queryRunner.query(`DROP INDEX "FK_EVENTO_SUBTIPOEVENTO"`);
    await queryRunner.query(`DROP INDEX "FK_EVENTO_TIPOEVENTO"`);
    await queryRunner.query(`DROP TABLE "evento"`);
  }
}
