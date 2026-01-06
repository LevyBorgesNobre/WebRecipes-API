import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Recipes } from "generated/prisma/browser";

interface GetFavoriteRecipeByUserUseCaseRequest {
    userId: string,
}

interface GetFavoriteRecipeByUserUseCaseResponse {
    recipes: Recipes[]
}

export class GetFavoriteRecipeByUserUseCase {
  constructor(
   private usersRepository: UsersRepository,
   private recipeRepository: RecipeRepository
    ){}

    async execute({
        userId
    }: GetFavoriteRecipeByUserUseCaseRequest): Promise<GetFavoriteRecipeByUserUseCaseResponse>{
        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new Error('Invalid ID.')
        }

        const recipes = await this.recipeRepository.findManyRecipesByFavorite(userId)

        return {
            recipes
        }
    }
}