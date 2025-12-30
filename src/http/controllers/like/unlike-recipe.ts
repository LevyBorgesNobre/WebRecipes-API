import { makeDeleteLikeUseCase } from "@/services/factories/make-delete-like-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function unlikeRecipe(req: FastifyRequest, reply: FastifyReply){
  
  const userIdSchema = z.string().uuid()

  const recipeIdSchema = z.object({
    recipeId: z.string().uuid()
  })

  const likeIdSchema = z.object({
    likeId: z.string().uuid()
  })

  const  userId  = userIdSchema.parse(req.userId)
  const { recipeId } =recipeIdSchema.parse(req.params)
  const { likeId } = likeIdSchema.parse(req.params)

  try {
    const deleteLikeUseCase = makeDeleteLikeUseCase()

    await deleteLikeUseCase.delete({
        likeId,
        userId,
        recipeId
    })

    reply.status(200).send({message:'Like deleted'})
  } catch (error) {
    return reply.status(404).send({message: `${error}`})
  }
}