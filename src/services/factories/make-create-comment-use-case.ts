import { PrismaRecipeRepository } from "@/repositories/prisma/prisma-recipe-repository";
import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository";
import { CreateCommentUseCase } from "../use-cases/comments/create-comment";

export function makeCreateCommentUseCase(){
  const recipeRepository = new PrismaRecipeRepository()
  const commentRepository = new PrismaCommentRepository()
  const createCommentUseCase = new CreateCommentUseCase(recipeRepository, commentRepository)

  return createCommentUseCase
}