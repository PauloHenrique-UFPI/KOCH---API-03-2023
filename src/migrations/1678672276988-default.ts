import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678672276988 implements MigrationInterface {
    name = 'default1678672276988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "data" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "created_at" TO "data"`);
    }

}
