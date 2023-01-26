import {MigrationInterface, QueryRunner} from "typeorm";

export class NovaTabelaSubtipoEventoCerto1671581166138 implements MigrationInterface {
    name = 'NovaTabelaSubtipoEventoCerto1671581166138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtipoEvento" DROP CONSTRAINT "FK_9a0e7b873683ceb5acb91139071"`);
        await queryRunner.query(`ALTER TABLE "subtipoEvento" ADD CONSTRAINT "FK_9a0e7b873683ceb5acb91139071" FOREIGN KEY ("tipoEvento_id") REFERENCES "tipoEvento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtipoEvento" DROP CONSTRAINT "FK_9a0e7b873683ceb5acb91139071"`);
        await queryRunner.query(`ALTER TABLE "subtipoEvento" ADD CONSTRAINT "FK_9a0e7b873683ceb5acb91139071" FOREIGN KEY ("tipoEvento_id") REFERENCES "subtipoEvento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
