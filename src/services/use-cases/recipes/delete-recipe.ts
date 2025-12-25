import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface DeleteUseCaseRequest {
  userId:                 string;
  recipeId:           string;
}

export class DeleteRecipeUseCase{
    constructor(
    private  recipeRepository: RecipeRepository,
    private  usersRepository: UsersRepository
    ){}

    async delete({
    userId,
    recipeId
    }: DeleteUseCaseRequest): Promise<any>{
      
      const user = await this.usersRepository.findById(userId)

      if(!user){
        throw new Error('User not found')
      }
      
      const recipe = await this.recipeRepository.findById(recipeId)
      
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