import { makeGetFavoriteRecipeByUserUseCase } from "@/services/factories/make-get-favorite-recipe-by-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function favoriteRecipesByUser(req: FastifyRequest, reply: FastifyReply){
  const userIdSchema = z.string().uuid()

  const userId = userIdSchema.parse(req.userId)
  
  try {
    const getFavoriteRecipeUseCase = makeGetFavoriteRecipeByUserUseCase()
    
    const { recipes } = await getFavoriteRecipeUseCase.execute({
        userId
    })

    return reply.status(200).send(
     recipes.map( ({ userId, ...rest }) => rest )
    )
  } catch (error) {
    
  }
}