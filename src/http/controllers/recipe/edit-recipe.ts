import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeEditRecipesUseCase } from "@/services/factories/make-edit-recipe-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function editRecipe(req: FastifyRequest, reply: FastifyReply){
 const recipesUpdateInputSchema = z.object({
   recipe_title: z.any().optional(),
   description: z.any().optional(),
   recipe_image: z.any().optional(),
   cook_time: z.any().optional(),
   favorites: z.any().optional(),
   }).strict();

   const userIdSchema = z.object({
    userId:z.string().uuid()
   })

   const recipeIdSchema = z.object({
    recipeId: z.string().uuid()
   })

   const recipeUpdateSchema = z.object({
        data: recipesUpdateInputSchema
   })

   const { userId } = userIdSchema.parse(req.params)
   const { recipeId } = recipeIdSchema.parse(req.params)
   const { data } = recipeUpdateSchema.parse(req.body)
   
   try {
    const updateRecipeUseCase = makeEditRecipesUseCase()

    const updateRecipe = await updateRecipeUseCase.execute({
        userId,
        recipeId,
        data
    })

    return reply.status(200).send(updateRecipe)
   } catch (error) {
      return reply.status(404).send({message:`${error}`})
   }

   
}