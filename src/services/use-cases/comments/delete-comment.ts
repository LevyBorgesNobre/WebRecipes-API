import { CommentRepository } from "@/repositories/comment-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface DeleteCommentUseCaseRequest{
    userId:string;
    recipeId:string;
    commentId:string
}

export class DeleteCommentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private recipeRepository: RecipeRepository,
        private commentRepository: CommentRepository
    ){}

   async delete({
    userId,
    recipeId,
    commentId
   }: DeleteCommentUseCaseRequest){
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

    const deleteComment = this.commentRepository.delete(userId, recipeId, commentId)
    
    return {
        deleteComment
    }
   }
}