import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAreakm2InObmFim1670079240642 implements MigrationInterface {
    name = 'AddAreakm2InObmFim1670079240642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "obmfim" ADD "area_km2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "obmfim" DROP COLUMN "area_km2"`);
    }

}
