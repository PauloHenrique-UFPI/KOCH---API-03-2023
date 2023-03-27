import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678678516100 implements MigrationInterface {
    name = 'default1678678516100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "data_nasc" TIMESTAMP NOT NULL, "naturalidade" character varying NOT NULL, "profissao" character varying NOT NULL, "nome_mae" character varying NOT NULL, "forma" integer NOT NULL, "cartao_sus" character varying NOT NULL, "endereco" character varying NOT NULL, "municipio" character varying NOT NULL, "ponto_ref" character varying NOT NULL, "telefone" character varying NOT NULL, "n_sinan" character varying NOT NULL, "unidade_tratamento" character varying NOT NULL, "unidade_cad" character varying NOT NULL, "img_trat" character varying NOT NULL, CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pacientes"`);
    }

}
