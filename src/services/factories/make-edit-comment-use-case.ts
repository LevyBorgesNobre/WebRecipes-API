import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository";
import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { EditCommentUseCase } from "../use-cases/comments/edit-comment";

export function makeEditCommentUseCase(){
    const recipeRepository = new PrismaRecipeRepository()
    const commentRepository = new PrismaCommentRepository()
    const editCommentUseCase = new EditCommentUseCase(recipeRepository, commentRepository)

    return editCommentUseCase
}