import { Recipes } from "@/domain/entities/recipes";
import { Favorite } from "generated/prisma/browser";
import { Like } from "@/domain/entities/like";
import { RecipeRepository } from "../recipe-repository";
import { CreateRecipesDTO } from "@/domain/dtos/recipes/create-recipe-dto";
import { FindRecipeByIdDTO } from "@/domain/dtos/recipes/find-recipe-by-id-dto";
import { UpdateRecipeDTO } from "@/domain/dtos/recipes/update-recipe-dto";
import { DeleteRecipeDTO } from "@/domain/dtos/recipes/delete-recipe";
import { FindRecipesByLikeDTO } from "@/domain/dtos/recipes/find-recipes-by-like-dto";
import { FindRecipeByFavoriteDTO } from "@/domain/dtos/recipes/find-recipes-by-favorite-dto";
import { FindRecipesByUserDTO } from "@/domain/dtos/recipes/find-recipes-by-user-dto";


export class InMemoryRecipeRepository implements RecipeRepository {

  public recipes: Recipes[] = []
   public likes: Like[] = []
   public favorites: Favorite[] = []
  
  async create(data: CreateRecipesDTO): Promise<Recipes>{
    const recipe: Recipes = {
      id: crypto.randomUUID(),
      recipe_title:data.recipe_title,
      description:data.description,
      recipe_image:data.recipe_image,
      cook_time:data.cook_time,
      servings:data.servings,
      ingredients:data.ingredients,
      cook_instructions:data.cook_instructions,
      userId:data.userId
    }

    this.recipes.push(recipe)

    return recipe
  }

async findById(id: FindRecipeByIdDTO): Promise<Recipes | null> {
   const recipes = this.recipes.find((org=> org.id === id.id))

    if (!recipes){
         return null
      }

    return recipes
}

async update(data: UpdateRecipeDTO): Promise<Recipes> {
  
  const recipeIndex = this.recipes.findIndex(
    (recipe) => recipe.id === data.recipeId && recipe.userId === data.userId
  );

  if (recipeIndex === -1) {
    throw new Error("Recipe not found");
  }

  const current = this.recipes[recipeIndex];

  const updated = {
    ...current,
    ...data,
  } as Recipes;

  this.recipes[recipeIndex] = updated;

  return updated;
}

async delete(data: DeleteRecipeDTO): Promise<void> {
  const index = this.recipes.findIndex(u => u.id === data.id);

  if (index === -1) {
 throw new Error('Recipe not found');
    }
    this.recipes.splice(index, 1)[0];
}

async findMany(): Promise<Recipes[]> {
  const dashboard = this.recipes.filter(recipes=> recipes)

  return dashboard
}

async findManyRecipesByUser(userId: FindRecipesByUserDTO): Promise<Recipes[]> {
  const recipesByUser = this.recipes.filter(recipes=> recipes.userId === userId.userId)

  return recipesByUser
}

async findManyRecipesByLike(userId: FindRecipesByLikeDTO): Promise<Recipes[]> {
     const likedRecipeIds = this.likes
    .filter(like => like.userId === userId.userId)
    .map(like => like.recipesId)

  return this.recipes.filter(recipe =>
    likedRecipeIds.includes(recipe.id)
  )
}

async findManyRecipesByFavorite(userId: FindRecipeByFavoriteDTO): Promise<Recipes[]> {
     const favoriteRecipeIds = this.favorites
    .filter(favorite => favorite.userId === userId.userId)
    .map(favorite => favorite.recipesId)

  return this.recipes.filter(recipe =>
    favoriteRecipeIds.includes(recipe.id)
  )
}
}