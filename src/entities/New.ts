import { Column, CreateDateColumn, Entity, Long, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class New {
    @PrimaryGeneratedColumn()
    readonly id: number; 

    @Column()
    titulo: string;

    @CreateDateColumn()
    readonly created_at: Date;

    @Column()
    img: string

    @Column()
    desc_curta: string

    @Column()
    desc_longa: string
}