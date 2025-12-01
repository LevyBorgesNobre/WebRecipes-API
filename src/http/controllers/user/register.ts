import { UserAlreadyExistsError } from "@/services/errors/user-alreadyy-exists-erros"
import { makeRegisterUserUseCase } from "@/services/factories/make-register-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function register(req: FastifyRequest, reply: FastifyReply){
    const registerUserSchema = z.object({
        name: z.string().max(50),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name , email, password } =  registerUserSchema.parse(req.body)
    
    try {
        const registerUseCase = makeRegisterUserUseCase()

        const user =  await registerUseCase.create({
            name,
            email,
            password
        })
       
    return reply.status(201).send({user})

    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({message:`${error.message}`})
        }
    }

}