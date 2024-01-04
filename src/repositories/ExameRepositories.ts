import { AppDataSource } from "../data-source";
import { Exame } from "../entities/Exame";


export const exameRepositorie = AppDataSource.getRepository(Exame)