import { Column, CreateDateColumn, Entity,  JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "./Paciente";

@Entity('prontuarios')
export class Prontuario {

    @PrimaryGeneratedColumn()
    readonly id: number; 

    @OneToOne(type => Paciente, content => Prontuario, {eager: true})
    @JoinColumn()
    paciente: Paciente;

    @Column()
    tipo: string;

    @Column()
    popu_especifica: string;

    @Column()
    beneficiario: string;

    @Column()
    tipo_doenca: string;

    @Column()
    se_extrapulmonar: string;

    @Column()
    agravos: string;

    @Column()
    diagnostico: string;

    @Column()
    radiografia: string;

    @Column()
    hiv: string;

    @Column()
    terapia: string;

    @Column()
    data_ini: Date;

    @Column()
    histopatologia: string;

    @Column()
    cultura: string;

    @Column()
    teste_sens: string;

    @Column()
    contatos_ident: string;
}