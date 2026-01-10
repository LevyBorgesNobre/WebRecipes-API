import { UpdateCommentDTO } from "@/domain/dtos/comment/update-comment-dto";
import { Comment } from "@/domain/entities/comment";
import { CommentRepository } from "@/repositories/comment-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface EditCommentUseCaseRequest {
  userId:    string;
  recipeId:  string;
  commentId: string;
  data:      UpdateCommentDTO
}

interface EditCommentUseCaseResponse {
  updatedComment: Comment
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
    }: EditCommentUseCaseRequest): Promise<EditCommentUseCaseResponse>{
       const user = await this.usersRepository.findById({id: userId})

       if(!user){
        throw new Error("User not found.")
       }

       const recipe = await this.recipeRepository.findById({id: recipeId})

       if(!recipe){
        throw new Error("Recipe not found.")
       }

      const isExistingComment = await this.commentRepository.findById({id: commentId})
      
      if(!isExistingComment){
        throw new Error("Comment not found.")
      }
      
       if(isExistingComment.userId !== user.id){
        throw new Error("User unauthorized.")
      }

      const updatedComment = await this.commentRepository.update({
        userId: userId, 
        recipesId: recipeId, 
        commentId: commentId,
        data:data.data
      })

      return {
        updatedComment
      }
    }
}