import { MigrationInterface, QueryRunner } from "typeorm";

export class default1702059601720 implements MigrationInterface {
    name = 'default1702059601720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Exame" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "img" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "paciente_id" integer, CONSTRAINT "PK_d540faa991f9180c1fed0c7aafb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Exame" ADD CONSTRAINT "FK_2309852d1959b1d117776910114" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Exame" DROP CONSTRAINT "FK_2309852d1959b1d117776910114"`);
        await queryRunner.query(`DROP TABLE "Exame"`);
    }

}
