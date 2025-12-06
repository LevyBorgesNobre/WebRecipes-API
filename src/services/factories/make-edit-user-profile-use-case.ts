import { PrismaUserProfileRepository } from "@/repositories/prisma/prisma-user-profile-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { EditUserProfileUseCase } from "../use-cases/user /edit-user-profile";

export function makeEditUserProfileUseCase(){
    const usersRepository = new PrismaUserRepository()
    const userProfileRepository = new PrismaUserProfileRepository()
    const userProfileUseCase = new EditUserProfileUseCase(usersRepository, userProfileRepository)

    return userProfileUseCase
}