import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { GetSelectedRecipeUseCase } from "../use-cases/recipes/get-selected-recipe";

export function makeGetSelectedRecipe(){
    const recipeRepository = new PrismaRecipeRepository()
    const getSelectedRecipeUseCase = new GetSelectedRecipeUseCase(recipeRepository)

    return getSelectedRecipeUseCase

}