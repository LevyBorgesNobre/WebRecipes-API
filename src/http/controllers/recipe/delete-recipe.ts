import { makeDeleteRecipeUseCase } from "@/services/factories/make-delete-recipe-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteRecipe(req: FastifyRequest, reply: FastifyReply){
    const userIdSchema = z.object({
        userId:z.string().uuid()
    })

    const deleteRecipeSchema = z.object({
        recipeId:z.string().uuid()
    })

    const { userId } = userIdSchema.parse(req.params)
    const {recipeId } = deleteRecipeSchema.parse(req.params)
     
   
    try {
      const deleteRecipeUseCase = makeDeleteRecipeUseCase()

       await deleteRecipeUseCase.delete({
        userId,
        recipeId
      })
        return reply.status(200)

    } catch (error) {
       reply.status(404).send({message:`${error}`})
    }
}