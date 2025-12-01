import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function  authenticate(req: FastifyRequest, reply: FastifyReply){
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password}  = authenticateUserSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const user = await authenticateUseCase.execute({
        email,
        password
    })

    return reply.status(200).send({
        user:{...user.user, password:undefined}
    })
    
  } catch (error) {
    if(error instanceof InvalidCredentialsError){
        return reply.status(409).send({message:`${error.message}`})
    }
  }
}