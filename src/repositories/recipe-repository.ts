import { CreateRecipesDTO } from "@/domain/dtos/recipes/create-recipe-dto"
import { DeleteRecipeDTO } from "@/domain/dtos/recipes/delete-recipe"
import { FindRecipeByIdDTO } from "@/domain/dtos/recipes/find-recipe-by-id-dto"
import { FindRecipeByFavoriteDTO } from "@/domain/dtos/recipes/find-recipes-by-favorite-dto"
import { FindRecipesByLikeDTO } from "@/domain/dtos/recipes/find-recipes-by-like-dto"
import { FindRecipesByUserDTO } from "@/domain/dtos/recipes/find-recipes-by-user-dto"
import { UpdateRecipeDTO } from "@/domain/dtos/recipes/update-recipe-dto"
import { Recipes } from "@/domain/entities/recipes"

export interface RecipeRepository{
   create(data: CreateRecipesDTO):Promise<Recipes>
   delete(data: DeleteRecipeDTO):Promise<Recipes>
   findById(id: FindRecipeByIdDTO): Promise<Recipes| null>
   update(data: UpdateRecipeDTO):Promise<Recipes>
   findMany():Promise<Recipes[]>
   findManyRecipesByUser(userId: FindRecipesByUserDTO): Promise<Recipes[]>
   findManyRecipesByLike(userId: FindRecipesByLikeDTO): Promise<Recipes[]>
   findManyRecipesByFavorite(userId: FindRecipeByFavoriteDTO): Promise<Recipes[]>
}