import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateRecipeUseCase } from  '../use-cases/recipes/create-recipe'

export function makeCreateRecipeUseCase(){
    const usersRepository = new PrismaUserRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository, usersRepository)

    return createRecipeUseCase
}