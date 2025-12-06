import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { EditRecipeUseCase } from "../use-cases/recipes/edit-recipe";
export function makeEditRecipesUseCase(){
    const usersRepository = new PrismaUserRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipeRepository, usersRepository)
    return editRecipeUseCase
}