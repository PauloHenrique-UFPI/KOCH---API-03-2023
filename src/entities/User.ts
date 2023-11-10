import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') // "users" é o nome da tabela
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;   // "readonly" é como se fosse o "final do Dart"

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  number: string;

  @Column({default: "user"})
  rule: string;

  @Column({nullable: true})
  valid_sign: Date;

  @Column({nullable: true})
  idPaciente: number

  @CreateDateColumn()
  readonly created_at: Date;
}

