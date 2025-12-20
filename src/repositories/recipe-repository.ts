import { Prisma, Recipes } from "generated/prisma/client"

export interface RecipeRepository{
   create(data: Prisma.RecipesCreateInput):Promise<Recipes>
   delete(data:Prisma.RecipesWhereUniqueInput):Promise<Recipes>
   findById(id: string): Promise<Recipes| null>
   update(userId: string, recipeId:string, data: Prisma.RecipesUpdateInput):Promise<Recipes>
   findMany():Promise<Recipes[]>
}