import { AppDataSource } from "../data-source";
import { New } from "../entities/New";

export const newRepositorie = AppDataSource.getRepository(New)