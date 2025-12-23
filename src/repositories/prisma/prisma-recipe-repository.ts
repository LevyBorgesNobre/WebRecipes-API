import { Recipes } from "generated/prisma/client";
import { RecipesCreateInput, RecipesUpdateInput, RecipesWhereUniqueInput } from "generated/prisma/models";
import { RecipeRepository } from "../recipe-repository";
import { prisma } from '@/lib/prisma'

export class PrismaRecipeRepository implements RecipeRepository {

   async create(data: RecipesCreateInput): Promise<Recipes> {
       const recipe = await prisma.recipes.create({
        data
       })
       return recipe
   }

  async delete(data: RecipesWhereUniqueInput): Promise<Recipes> {
      const recipe = await prisma.recipes.delete({
        where: data
      })
      return recipe
  }

  async findById(id: string): Promise<Recipes | null> {
     const recipe = await prisma.recipes.findUnique({
            where:{
                id
            }
        })
        return recipe
  }

  async update(userId: string, recipeId: string, data: RecipesUpdateInput): Promise<Recipes> {
      const recipe = await prisma.recipes.update({
        where:{
            userId:userId,
            id: recipeId
        },
        data:{
            ...data,
        }
      })
      return recipe
  }

  async findMany(): Promise<Recipes[]> {
      const recipe = await prisma.recipes.findMany()

      return recipe
  }

  async findManyByUser(userId: string ): Promise<Recipes[]> {
    const recipe = await prisma.recipes.findMany({
        where:{
            userId
        }
    })

    return recipe
  }
}