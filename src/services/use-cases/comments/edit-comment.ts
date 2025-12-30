import { CommentRepository } from "@/repositories/comment-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CommentUpdateInput } from "generated/prisma/models";

interface EditCommentUseCaseRequest {
  userId:    string;
  recipeId:  string;
  commentId: string;
  data:   CommentUpdateInput
}

export class EditCommentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private recipeRepository: RecipeRepository,
        private commentRepository: CommentRepository
    ){}

   async update({
    userId,
    recipeId,
    commentId,
    data
    }: EditCommentUseCaseRequest){
       const user = await this.usersRepository.findById(userId)

       if(!user){
        throw new Error("User not found.")
       }

       const recipe = await this.recipeRepository.findById(recipeId)

       if(!recipe){
        throw new Error("Recipe not found.")
       }

      const isExistingComment = await this.commentRepository.findById(commentId)
      
      if(!isExistingComment){
        throw new Error("Comment not found.")
      }
      
       if(isExistingComment.userId !== user.id){
        throw new Error("User unauthorized.")
      }

      const editComment = await this.commentRepository.update(userId, recipeId, commentId, data)

      return {
        editComment
      }
    }
}