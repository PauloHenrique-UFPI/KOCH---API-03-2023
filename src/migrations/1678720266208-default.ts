import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678720266208 implements MigrationInterface {
    name = 'default1678720266208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prontuarios" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "popu_especifica" character varying NOT NULL, "beneficiario" character varying NOT NULL, "tipo_doenca" character varying NOT NULL, "se_extrapulmonar" character varying NOT NULL, "agravos" character varying NOT NULL, "diagnostico" character varying NOT NULL, "radiografia" character varying NOT NULL, "hiv" character varying NOT NULL, "terapia" character varying NOT NULL, "data_ini" TIMESTAMP NOT NULL, "histopatologia" character varying NOT NULL, "cultura" character varying NOT NULL, "teste_sens" character varying NOT NULL, "contatos_ident" character varying NOT NULL, CONSTRAINT "PK_1c9bdb8e627734fe730830832f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD "prontuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "UQ_c502e6bfd8d8fad1e361b06ad05" UNIQUE ("prontuarioId")`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "FK_c502e6bfd8d8fad1e361b06ad05" FOREIGN KEY ("prontuarioId") REFERENCES "prontuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "FK_c502e6bfd8d8fad1e361b06ad05"`);
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "UQ_c502e6bfd8d8fad1e361b06ad05"`);
        await queryRunner.query(`ALTER TABLE "pacientes" DROP COLUMN "prontuarioId"`);
        await queryRunner.query(`DROP TABLE "prontuarios"`);
    }

}
