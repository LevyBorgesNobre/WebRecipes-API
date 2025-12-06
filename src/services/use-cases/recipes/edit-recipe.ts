import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { RecipesUpdateInput } from "generated/prisma/models";

interface EditUseCaseRequest {
  userId:            string;
  recipeId:          string;
  data:              RecipesUpdateInput
}

export class EditRecipeUseCase{
    constructor(
    private  recipeRepository: RecipeRepository,
    private  usersRepository: UsersRepository
    ){}

    async execute({
    userId,
    recipeId,
    data
    }: EditUseCaseRequest): Promise<any>{
      
      const user = await this.usersRepository.findById(userId)

      if(!user){
        throw new ResourceNotFoundError()
      }
      
      const recipe = await this.recipeRepository.findById(recipeId)

      if(!recipe){
        throw new ResourceNotFoundError()
      }
      
      const editRecipe = await this.recipeRepository.update(userId, recipeId, data)

      return {
        editRecipe
      }
    }
}