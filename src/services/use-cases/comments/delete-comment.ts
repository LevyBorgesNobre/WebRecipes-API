import { CommentRepository } from "@/repositories/comment-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";


interface DeleteCommentUseCaseRequest{
    userId:string;
    recipeId:string;
    commentId:string
}

interface DeleteCommentUseCaseResponse {
    deleteComment: void
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
   }: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse>{
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

    const deleteComment = await this.commentRepository.delete({
        userId: userId,
        recipesId: recipeId,
        commentId: commentId,
    })
    
    return {
        deleteComment
    }
   }
}