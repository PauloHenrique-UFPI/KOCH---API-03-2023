import { AppDataSource } from "../data-source";
import { Prontuario } from "../entities/Prontuario";

export const prontuarioRepositorie = AppDataSource.getRepository(Prontuario)