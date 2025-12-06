import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

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
        throw new ResourceNotFoundError()
      }
      
      const recipe = await this.recipeRepository.findById(recipeId)

      if(!recipe){
        throw new ResourceNotFoundError()
      }
      
      const deleteRecipe = await this.recipeRepository.delete({id: recipeId})

      return {
        deleteRecipe
      }
    }
}