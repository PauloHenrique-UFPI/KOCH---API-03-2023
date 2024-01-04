import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "./Paciente";

@Entity('Exame')
export class Exame {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: String

    @Column()
    img: String

    @Column()
    date: Date

    @ManyToOne(type => Paciente, content => Exame, {eager: true})
    @JoinColumn({name: 'paciente_id'})
    paciente: Paciente
}