import { Recipes } from "@/domain/entities/recipes";
import { RecipeRepository } from "../recipe-repository";
import { db } from '@/lib/prisma'
import { CreateRecipesDTO } from "@/domain/dtos/recipes/create-recipe-dto";
import { DeleteRecipeDTO } from "@/domain/dtos/recipes/delete-recipe";
import { FindRecipeByIdDTO } from "@/domain/dtos/recipes/find-recipe-by-id-dto";
import { UpdateRecipeDTO } from "@/domain/dtos/recipes/update-recipe-dto";
import { FindRecipesByUserDTO } from "@/domain/dtos/recipes/find-recipes-by-user-dto";
import { FindRecipesByLikeDTO } from "@/domain/dtos/recipes/find-recipes-by-like-dto";
import { FindRecipeByFavoriteDTO } from "@/domain/dtos/recipes/find-recipes-by-favorite-dto";

export class PrismaRecipeRepository implements RecipeRepository {

   async create(data: CreateRecipesDTO): Promise<Recipes> {
       const recipe = await db.recipes.create({
        data
       })
       
       return recipe
   }

  async delete(data: DeleteRecipeDTO): Promise<void> {
    await db.recipes.delete({
        where: data
      })
  }

  async findById(id: FindRecipeByIdDTO): Promise<Recipes | null> {
     const recipe = await db.recipes.findUnique({
            where:{
                id: id.id
            }
        })

        return recipe
  }

  async update(data: UpdateRecipeDTO): Promise<Recipes> {
      const recipe = await db.recipes.update({
        where:{
            userId:data.userId,
            id: data.recipeId
        },
        data:{
            ...data,
        }
      })

      return recipe
  }

  async findMany(): Promise<Recipes[]> {
      const recipe = await db.recipes.findMany()

      return recipe
  }

  async findManyRecipesByUser(userId: FindRecipesByUserDTO): Promise<Recipes[]> {
    const recipe = await db.recipes.findMany({
        where:{
            userId: userId.userId
        }
    })

    return recipe
  }

  async findManyRecipesByLike(userId: FindRecipesByLikeDTO): Promise<Recipes[]> {
    const recipes = await db.recipes.findMany({
    where:{
      likes:{
        some:{
          userId: userId.userId
        }
      }
    }
    })

    return recipes
  }
  
  async findManyRecipesByFavorite(userId: FindRecipeByFavoriteDTO): Promise<Recipes[]> {
    const recipes = await db.recipes.findMany({
      where: {
        favorites:{
          some:{
            userId: userId.userId
          }
        }
      }
    })

    return recipes
  }

}