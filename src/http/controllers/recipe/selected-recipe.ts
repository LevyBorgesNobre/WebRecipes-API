import { makeGetSelectedRecipe } from "@/services/factories/make-get-selected-recipe";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function selectedRecipe(req: FastifyRequest, reply: FastifyReply){
  const recipeIdSchema = z.object({
    id:z.string().uuid()
  })

  const { id } = recipeIdSchema.parse(req.params)
  
  try {
    const selectedRecipeUseCase = makeGetSelectedRecipe()

    const { recipe } = await selectedRecipeUseCase.execute({
        id
    })

    return reply.status(200).send(recipe)
  } catch (error) {
    return reply.status(404).send(error)
  }
  
}