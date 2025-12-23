import { Recipes } from "generated/prisma/client";
import { Prisma } from "generated/prisma/client";
import { RecipeRepository } from "../recipe-repository";
import { RecipesCreateInput } from "generated/prisma/models";


export class InMemoryRecipeRepository implements RecipeRepository {
  public recipes: Recipes[] = []

  
  async create(data: RecipesCreateInput): Promise<Recipes>{
    const recipe: Recipes = {
      id: crypto.randomUUID(),
      recipe_title:data.recipe_title,
      description:data.description,
      recipe_image:data.recipe_image,
      cook_time:data.cook_time,
      servings:data.servings,
      ingredients:data.ingredients as string[],
      cook_instructions:data.cook_instructions as string [],
      userId:data.user.connect?.id as string
    }

    this.recipes.push(recipe)

    return recipe
  }

async findById(id: string): Promise<Recipes | null> {
   const recipes = this.recipes.find((org=> org.id === id))

    if (!recipes){
         return null
      }

    return recipes
}

async update(userId: string, recipeId: string, data: Prisma.RecipesUpdateInput): Promise<Recipes> {
  
  const recipeIndex = this.recipes.findIndex(
    (recipe) => recipe.id === recipeId && recipe.userId === userId
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

async delete(data: Prisma.RecipesWhereUniqueInput): Promise<Recipes> {
  const index = this.recipes.findIndex(u => u.id === data.id);

  if (index === -1) {
 throw new Error('Recipe not found');
    }
 return this.recipes.splice(index, 1)[0];
}

async findMany(): Promise<Recipes[]> {
  const dashboard = this.recipes.filter(recipes=> recipes)

  return dashboard
}

async findManyByUser(userId: string): Promise<Recipes[]> {
  const recipesByUser = this.recipes.filter(recipes=> recipes.userId === userId)

  return recipesByUser
}
}