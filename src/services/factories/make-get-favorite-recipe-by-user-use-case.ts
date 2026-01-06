import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetFavoriteRecipeByUserUseCase } from "../use-cases/recipes/get-favorite-recipe-by-user";

export function makeGetFavoriteRecipeByUserUseCase (){
    const usersRepository = new PrismaUserRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const getFavoriteRecipeByUserUseCase = new GetFavoriteRecipeByUserUseCase(usersRepository, recipeRepository)

    return getFavoriteRecipeByUserUseCase
}