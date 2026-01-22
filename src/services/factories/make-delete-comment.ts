import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository";
import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { DeleteCommentUseCase } from "../use-cases/comments/delete-comment";

export function makeDeleteCommentUseCase(){
    const recipeRepository = new PrismaRecipeRepository()
    const commentRepository = new PrismaCommentRepository()
    const deleteCommentUseCase = new DeleteCommentUseCase(recipeRepository, commentRepository)

    return deleteCommentUseCase
}