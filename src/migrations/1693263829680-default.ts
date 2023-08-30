import { MigrationInterface, QueryRunner } from "typeorm";

export class default1693263829680 implements MigrationInterface {
    name = 'default1693263829680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Eventos" ("id" SERIAL NOT NULL, "tittle" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "paciente_id" integer, CONSTRAINT "PK_65e0861d9b3637eecf3b9aca467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id_paciente" integer`);
        await queryRunner.query(`ALTER TABLE "Eventos" ADD CONSTRAINT "FK_c4ce9825f025a7cfe24b630cf9f" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Eventos" DROP CONSTRAINT "FK_c4ce9825f025a7cfe24b630cf9f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id_paciente"`);
        await queryRunner.query(`DROP TABLE "Eventos"`);
    }

}
