import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678151726464 implements MigrationInterface {
    name = 'default1678151726464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
    }

}
