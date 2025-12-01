import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../use-cases/register";

export function makeRegisterUserUseCase (){
    const usersRepository =  new PrismaUserRepository()
    const createUserUseCase = new RegisterUseCase(usersRepository)
    
    return createUserUseCase
}