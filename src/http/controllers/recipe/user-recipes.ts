import { makeGetUserRecipe } from "@/services/factories/make-get-user-recipe";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function userRecipes(req: FastifyRequest, reply: FastifyReply){
  const userIdSchema = z.string().uuid()

  const userId = userIdSchema.parse(req.userId)
  try {
    const userRecipes = makeGetUserRecipe()

    const  { recipes } = await userRecipes.execute({
        userId
    })
    return reply.status(200).send(  recipes.map( ({ userId, ...rest }) => rest ))
  } catch (error) {
    
    return reply.status(404).send(Error)
  }
}