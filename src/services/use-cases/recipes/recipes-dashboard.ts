import { RecipeRepository } from "@/repositories/recipe-repository";
import { Recipes } from "generated/prisma/client";

interface RecipesDashboardUseCaseResponse {
  recipes: Recipes[]
}

export class RecipesDashboardUseCase{
    constructor(
    private  recipeRepository: RecipeRepository,
    ){}

    async execute(): Promise<RecipesDashboardUseCaseResponse>{
      
      const recipes = await this.recipeRepository.findMany()

      return{
        recipes
      }

    }
}