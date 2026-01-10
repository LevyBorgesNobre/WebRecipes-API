import { LikeRepository } from "@/repositories/like-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface DeleteLikeUseCaseRequest {
    userId:    string;
    recipeId:  string;
    likeId:    string;
}

interface DeleteLikeUseCaseResponse {
    deleteLike: void
  }

export class DeleteLikeUseCase{
    constructor(
    private  usersRepository: UsersRepository,
    private  recipeRepository: RecipeRepository,
    private  likeRepository: LikeRepository
    ){}

    async delete({
      userId,
      recipeId,
      likeId
    }: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse>{
      
      const user = await this.usersRepository.findById({id: userId})

      if(!user){
        throw new Error('User not found.')
      }
      
      const recipe = await this.recipeRepository.findById({id: recipeId})

      if(!recipe){
        throw new Error('Recipe not found.')
      }

      const like = await this.likeRepository.findById({id: likeId})

      if(!like){
        throw new Error('Like not found.')
      }
      
      const deleteLike = await this.likeRepository.delete({
        id:likeId,
        userId:userId,
        recipesId:recipeId
      })

      return {
        deleteLike
      }
    }
}