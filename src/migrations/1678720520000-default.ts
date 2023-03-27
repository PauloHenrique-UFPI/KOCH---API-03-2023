import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678720520000 implements MigrationInterface {
    name = 'default1678720520000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "FK_c502e6bfd8d8fad1e361b06ad05"`);
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "UQ_c502e6bfd8d8fad1e361b06ad05"`);
        await queryRunner.query(`ALTER TABLE "pacientes" DROP COLUMN "prontuarioId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" ADD "prontuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "UQ_c502e6bfd8d8fad1e361b06ad05" UNIQUE ("prontuarioId")`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "FK_c502e6bfd8d8fad1e361b06ad05" FOREIGN KEY ("prontuarioId") REFERENCES "prontuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
