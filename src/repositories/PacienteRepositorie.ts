import { AppDataSource } from "../data-source";
import { Paciente } from "../entities/Paciente";

export const pacienteRepositorie = AppDataSource.getRepository(Paciente)