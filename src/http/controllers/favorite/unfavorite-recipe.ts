import { makeDeleteFavoriteUseCase } from "@/services/factories/make-delete-favorite-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function unfavoriteRecipe(req: FastifyRequest, reply: FastifyReply){
     
    const userIdSchema = z.string().uuid()
  
    const recipeIdSchema = z.object({
      recipeId: z.string().uuid()
    })
  
    const likeIdSchema = z.object({
      favoriteId: z.string().uuid()
    })
    
    const userId = userIdSchema.parse(req.userId)
    const { recipeId } =recipeIdSchema.parse(req.params)
    const { favoriteId } = likeIdSchema.parse(req.params)

    try {
      const deleteFavoriteUseCase = makeDeleteFavoriteUseCase()

      await deleteFavoriteUseCase.delete({
          favoriteId,
          userId,
          recipeId
      })
  
      reply.status(200).send({message:'favorite deleted'})
    } catch (error) {
        return reply.status(404).send({message: `${error}`})
    }
}