import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { DeleteRecipeUseCase } from "../use-cases/recipes/delete-recipe";

export function makeDeleteRecipeUseCase(){
    const usersRepository = new PrismaUserRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository,usersRepository)
    return deleteRecipeUseCase

}