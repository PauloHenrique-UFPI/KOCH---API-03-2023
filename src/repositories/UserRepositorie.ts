import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepositorie = AppDataSource.getRepository(User)

