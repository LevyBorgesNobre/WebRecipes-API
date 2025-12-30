import { makeEditCommentUseCase } from "@/services/factories/make-edit-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function editComment(req: FastifyRequest, reply: FastifyReply){

  const userIdSchema = z.string().uuid()

  const idSchema = z.object({
    recipeId:z.string().uuid(),
    commentId:z.string().uuid()
  })
   
  const commentUpdateSchema = z.object({
    comment:z.string()
    .max(500)
    .optional(),
  }).strict()

  const commentSchema = z.object({
    data: commentUpdateSchema
  })
  
  const userId = userIdSchema.parse(req.userId)
  const { recipeId, commentId } = idSchema.parse(req.params)
  const { data } = commentSchema.parse(req.body)

  try {
    const editCommentUseCase = makeEditCommentUseCase()

    const editComment = await editCommentUseCase.update({
      userId,
      recipeId,
      commentId,
      data
    })
   
    reply.status(200).send(editComment)

  } catch (error) {
    reply.status(404).send({message:`${error}`})
  }
}