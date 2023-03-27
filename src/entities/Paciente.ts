import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prontuario } from "./Prontuario";

@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    readonly id: number; 

    @Column()
    nome: string;

    @Column()
    data_nasc: Date;

    @Column()
    naturalidade: string;

    @Column()
    profissao: string;

    @Column()
    nome_mae: string;

    @Column()
    forma: number;

    @Column()
    cartao_sus: string;

    @Column()
    endereco: string;

    @Column()
    municipio: string;

    @Column()
    ponto_ref: string;

    @Column({nullable: true})
    telefone: string;

    @Column()
    n_sinan: string;

    @Column()
    unidade_tratamento: string;

    @Column()
    unidade_cad: string;

    @Column({nullable: true})
    img_trat: string
}