import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678680870298 implements MigrationInterface {
    name = 'default1678680870298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" ALTER COLUMN "telefone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacientes" ALTER COLUMN "img_trat" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" ALTER COLUMN "img_trat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacientes" ALTER COLUMN "telefone" SET NOT NULL`);
    }

}
