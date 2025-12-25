import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
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
        throw new Error('User not found')
      }
      
      const recipe = await this.recipeRepository.findById(recipeId)

      if(!recipe){
        throw new Error('Recipe not found')
      }
        if(recipe.userId !== user.id){
        throw new Error('User not authorized')
      }
     
      const editRecipe = await this.recipeRepository.update(userId, recipeId, data)

    return {
    ...editRecipe,       
    recipeId: recipe.id,
    userId: recipe.userId,
   }


    }
}