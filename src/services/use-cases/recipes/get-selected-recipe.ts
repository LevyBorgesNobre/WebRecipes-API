import { RecipeRepository } from "@/repositories/recipe-repository";
import { Recipes } from "@/domain/entities/recipes";

interface GetSelectedRecipeRequest {
    id: string
}

interface GetSelectedRecipeResponse {
    recipe: Recipes
}

export class GetSelectedRecipeUseCase {
    constructor(
     private recipeRepository: RecipeRepository
    ){}

    async execute({
        id
    }: GetSelectedRecipeRequest): Promise<GetSelectedRecipeResponse>{
        const recipe = await this.recipeRepository.findById({id: id})

        if(!recipe){
            throw new Error('Recipe not found.')
        }

        return {
            recipe
        } 
    }
}