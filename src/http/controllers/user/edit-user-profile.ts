import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditUserProfileUseCase } from "@/services/factories/make-edit-user-profile-use-case";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function editUserProfile(req: FastifyRequest, reply: FastifyReply){
 const userIdSchema = z.string().uuid()

 const userProfileSchema = z.object({
   bio:z.string().max(300),
   location:z.string().max(100),
   experience_level:z.string().max(100),
   favorite_ingredient:z.string().max(100),
   cooking_specialities:z.string().max(100),
 })

 const { bio,
         location, 
         experience_level, 
         favorite_ingredient, 
         cooking_specialities } = userProfileSchema.parse(req.body)
 const id  = userIdSchema.parse(req.userId)

 try {
  const makeEditUserProfile = makeEditUserProfileUseCase()

   const userProfile = await makeEditUserProfile.execute({
    id,
    bio,
    location,
    experience_level,
    favorite_ingredient,
    cooking_specialities
   })

   return reply.status(200).send({userProfile})

 } catch (error) {
   if(error instanceof ResourceNotFoundError){
    reply.status(404).send({message :`${error.message}`})
   }
 }
  
}