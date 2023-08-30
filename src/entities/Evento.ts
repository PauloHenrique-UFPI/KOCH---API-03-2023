import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "./Paciente";

@Entity('Eventos')
export class Evento {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tittle: String

    @Column()
    date: Date

    @ManyToOne(type => Paciente, content => Evento, {eager: true})
    @JoinColumn({name: 'paciente_id'})
    paciente: Paciente
}