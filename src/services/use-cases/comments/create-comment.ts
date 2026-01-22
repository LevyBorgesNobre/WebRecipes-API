import { RecipeRepository } from "@/repositories/recipe-repository";
import { CommentRepository } from "@/repositories/comment-repository";
import { Comment } from "@/domain/entities/comment";

interface CreateCommentUseCaseRequest {
    userId:   string;
    recipeId: string;
    comment:  string;
}

interface CreateCommentUseCaseUseCaseResponse {
    createComment: Comment
}

export class CreateCommentUseCase {
    constructor(
     private recipeRepository: RecipeRepository,
     private commentRepository: CommentRepository
    ){}

    async create({
     userId,
     recipeId,
     comment
    }:  CreateCommentUseCaseRequest):Promise<CreateCommentUseCaseUseCaseResponse>{

        const recipe = await this.recipeRepository.findById({id: recipeId})

        if(!recipe){
            throw new Error('Recipe not found.')
        }

     const createComment = await this.commentRepository.create({
       userId,
       recipesId: recipeId,
       comment
     })

       return {
         createComment
       }
    }
}