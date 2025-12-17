import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserDataUseCase } from "../use-cases/user /get-user-data";

export function makeGetUserDataUseCase (){
    const usersRepository = new PrismaUserRepository()
    const getUserDataUseCase = new GetUserDataUseCase(usersRepository)
    
    return getUserDataUseCase
}