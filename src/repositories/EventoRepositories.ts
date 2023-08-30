import { AppDataSource } from "../data-source";
import { Evento } from "../entities/Evento";


export const eventoRepositorie = AppDataSource.getRepository(Evento)