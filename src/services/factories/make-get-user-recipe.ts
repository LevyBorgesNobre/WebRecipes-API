import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserRecipesUseCase } from "../use-cases/recipes/get-user-recipes";

export function makeGetUserRecipe(){
    const usersRepository = new PrismaUserRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const getUserRecipeUseCase = new GetUserRecipesUseCase(usersRepository, recipeRepository)

    return getUserRecipeUseCase
}