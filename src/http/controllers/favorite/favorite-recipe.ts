
import { makeCreateFavoriteUseCase } from "@/services/factories/make-create-favorite-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function favoriteRecipe(req: FastifyRequest, reply: FastifyReply){

    const userIdSchema = z.string().uuid()
    
    const recipeIdSchema = z.object({
        recipeId: z.string().uuid()
    })

   const userId = userIdSchema.parse(req.userId)
   const { recipeId } = recipeIdSchema.parse(req.params)

   try {
    const createLikeUseCase = makeCreateFavoriteUseCase()

    const favorite = await createLikeUseCase.create({
        userId,
        recipeId
    })
    return reply.status(201).send(favorite)

   } catch (error) {
      return reply.status(404).send({message: `${error}`})
    
   }
}