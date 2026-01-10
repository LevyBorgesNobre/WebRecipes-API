import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UpdateRecipeDTO } from "@/domain/dtos/recipes/update-recipe-dto";
import { Recipes } from "@/domain/entities/recipes";

interface EditUseCaseRequest {
  userId:            string;
  recipeId:          string;
  data:              UpdateRecipeDTO
}

interface EditUseCaseResponse {
  updateRecipe: Recipes | null
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
    }: EditUseCaseRequest): Promise<EditUseCaseResponse>{
      
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

      const updateRecipe = await this.recipeRepository.update({userId: userId, recipeId: recipeId, data: data})

     return {
      updateRecipe
     }


    }
}