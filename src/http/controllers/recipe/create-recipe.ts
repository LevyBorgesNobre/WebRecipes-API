import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateRecipeUseCase } from '../../../services/factories/make-create-recipe-use-case';
import z from "zod";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

  export async function createRecipe(req: FastifyRequest, reply: FastifyReply){
    const userIdSchema = z.string().uuid()

    const recipeSchema = z.object({
        recipe_title: z.string().max(100),
        description: z.string().max(500),
        recipe_image: z.string(),
        cook_time:z.string().max(50),
        servings:z.string().max(50),
        ingredients:z.array(z.string()).max(50),
        cook_instructions:z.array(z.string()).max(50),
    })

    const id = userIdSchema.parse(req.userId)

    const {
        recipe_title,
        description,
        recipe_image,
        cook_time,
        servings,
        ingredients,
        cook_instructions
        } = recipeSchema.parse(req.body)

             try { 
                const createRecipeUseCase = makeCreateRecipeUseCase()

                const recipe = await createRecipeUseCase.create({
                    id,
                    recipe_title,
                    description,
                    recipe_image,
                    cook_time,
                    servings,
                    ingredients,
                    cook_instructions,
                })

                return reply.status(201).send(recipe)
             } catch (error) {
                if(error instanceof ResourceNotFoundError){
                    reply.status(404).send({message: `${error}`})
                }
             }

    
}