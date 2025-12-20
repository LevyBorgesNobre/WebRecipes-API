import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetRecipesDashboardUseCase } from "@/services/factories/make-get-recipes-dashboard-use-case";

export async function dashboard(req: FastifyRequest, reply: FastifyReply){
    try {
        const getRecipesDashboardUseCase = makeGetRecipesDashboardUseCase()
        const { recipes } = await getRecipesDashboardUseCase.execute()

        return reply.status(200).send(recipes)

    } catch (error) {
        return reply.status(500).send(error)
    }
}