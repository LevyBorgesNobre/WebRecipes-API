import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Recipes } from "@/domain/entities/recipes";

interface GetUserRecipesUseCaseRequest {
   userId:   string;
}

interface GetUserRecipesUseCaseResponse {
    recipes: Recipes[]
}

export class GetUserRecipesUseCase {
 
    constructor(
        private usersRepository: UsersRepository,
        private recipeRepository: RecipeRepository
    ){}
    
    async execute({
        userId,
    }:GetUserRecipesUseCaseRequest): Promise<GetUserRecipesUseCaseResponse>{
       const user = await this.usersRepository.findById({id: userId})

       if(!user){
        throw new Error('User not found.')
       }

       const recipes = await this.recipeRepository.findManyRecipesByUser({userId: userId})

       return {
        recipes
       }

    }
}