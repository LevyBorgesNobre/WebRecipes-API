import { UpdateCommentDTO } from "@/domain/dtos/comment/update-comment-dto";
import { Comment } from "@/domain/entities/comment";
import { CommentRepository } from "@/repositories/comment-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";

interface EditCommentUseCaseRequest {
  userId:    string;
  recipeId:  string;
  commentId: string;
  data:      UpdateCommentDTO['data']
}

interface EditCommentUseCaseResponse {
  comment : Comment
}

export class EditCommentUseCase {
    constructor(
        private recipeRepository: RecipeRepository,
        private commentRepository: CommentRepository
    ){}

   async update({
    userId,
    recipeId,
    commentId,
    data
    }: EditCommentUseCaseRequest): Promise<EditCommentUseCaseResponse>{

       const recipe = await this.recipeRepository.findById({id: recipeId})

       if(!recipe){
        throw new Error("Recipe not found.")
       }

      const isExistingComment = await this.commentRepository.findById({id: commentId})
      
      if(!isExistingComment){
        throw new Error("Comment not found.")
      }
      
       if(isExistingComment.userId !== userId){
        throw new Error("User unauthorized.")
      }

      const comment = await this.commentRepository.update({
        userId: userId, 
        recipesId: recipeId, 
        commentId: commentId,
        data:data
      })

      return {
        comment
      }
    }
}