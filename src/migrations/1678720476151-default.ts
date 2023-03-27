import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678720476151 implements MigrationInterface {
    name = 'default1678720476151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prontuarios" ADD "pacienteId" integer`);
        await queryRunner.query(`ALTER TABLE "prontuarios" ADD CONSTRAINT "UQ_836d540c88b70704037f9fc35d7" UNIQUE ("pacienteId")`);
        await queryRunner.query(`ALTER TABLE "prontuarios" ADD CONSTRAINT "FK_836d540c88b70704037f9fc35d7" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prontuarios" DROP CONSTRAINT "FK_836d540c88b70704037f9fc35d7"`);
        await queryRunner.query(`ALTER TABLE "prontuarios" DROP CONSTRAINT "UQ_836d540c88b70704037f9fc35d7"`);
        await queryRunner.query(`ALTER TABLE "prontuarios" DROP COLUMN "pacienteId"`);
    }

}
