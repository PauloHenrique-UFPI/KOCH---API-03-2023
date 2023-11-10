import { MigrationInterface, QueryRunner } from "typeorm";

export class default1699593994452 implements MigrationInterface {
    name = 'default1699593994452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id_paciente" TO "idPaciente"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "idPaciente" TO "id_paciente"`);
    }

}
