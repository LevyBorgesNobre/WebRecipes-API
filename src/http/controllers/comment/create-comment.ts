import { makeCreateCommentUseCase } from "@/services/factories/make-create-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createComment(req: FastifyRequest, reply: FastifyReply){
    
   const userIdSchema = z.string().uuid()

   const recipeIdSchema = z.object({
    recipeId:z.string().uuid()
   })

   const commentSchema = z.object({
    comment:z.string()
    .trim()
    .min(1, "Comentário não pode ser vazio")
    .max(500, "Comentário muito longo")
   })

   const userId = userIdSchema.parse(req.userId)
   const { recipeId}  = recipeIdSchema.parse(req.params)
   const { comment } = commentSchema.parse(req.body)

   try {
    const createCommentUseCase = makeCreateCommentUseCase()
    
    const createComment = await createCommentUseCase.create({
        userId,
        recipeId,
        comment
    })
    
    const { userId:__, ...commentWithoutUserId} = createComment.createComment
    reply.status(201).send(
        commentWithoutUserId
    )

   } catch (error) {
    if (error){
        reply.status(404).send({message:`${error}`})
    }
   }
}