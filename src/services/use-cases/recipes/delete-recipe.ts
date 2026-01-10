import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface DeleteRecipeUseCaseRequest {
  userId:   string;
  recipeId: string;
}

interface DeleteRecipeUseCaseResponse {
  deleteRecipe: void
}

export class DeleteRecipeUseCase{
    constructor(
    private  recipeRepository: RecipeRepository,
    private  usersRepository: UsersRepository
    ){}

    async delete({
    userId,
    recipeId
    }: DeleteRecipeUseCaseRequest): Promise<DeleteRecipeUseCaseResponse>{
      
      const user = await this.usersRepository.findById({id: userId})

      if(!user){
        throw new Error('User not found')
      }

      const recipe = await this.recipeRepository.findById({id: recipeId})

      if(!recipe){
        throw new Error('Recipe not found')
      }

      if(recipe.userId !== user.id){
        throw new Error('User not authorized')
      }

      const deleteRecipe = await this.recipeRepository.delete({id: recipeId})

      return {
        deleteRecipe
      }
    }
}