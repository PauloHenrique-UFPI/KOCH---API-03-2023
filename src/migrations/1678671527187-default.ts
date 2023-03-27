import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678671527187 implements MigrationInterface {
    name = 'default1678671527187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "data" TIMESTAMP NOT NULL, "img" character varying NOT NULL, "desc_curta" character varying NOT NULL, "desc_longa" character varying NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
