import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}