import { makeGetUserDataUseCase } from "@/services/factories/make-get-user-data-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function userData(req: FastifyRequest, reply: FastifyReply){

      const getUserDataUseCase = makeGetUserDataUseCase()

      const { user}  = await getUserDataUseCase.execute({
        id: req.user.sub
      })

      return reply.status(200).send({
        user:{
        ...user, 
        id:undefined,
        password:undefined
        }
     })
        
}