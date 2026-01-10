import { DeleteFavoriteDTO } from "@/domain/dtos/favorite/delete-favorite-dto";
import { FavoriteRepository } from "@/repositories/favorite-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";

interface DeleteFavoriteUseCaseRequest {
    userId:    string;
    recipeId:  string;
    favoriteId:    string;
}

interface DeleteFavoriteUseCaseResponse {
    deleteFavorite: void
}

export class DeleteFavoriteUseCase{
    constructor(
    private  usersRepository: UsersRepository,
    private  recipeRepository: RecipeRepository,
    private  favoriteRepository: FavoriteRepository
    ){}

    async delete({
      userId,
      recipeId,
      favoriteId
    }: DeleteFavoriteUseCaseRequest): Promise<DeleteFavoriteUseCaseResponse>{
      
      const user = await this.usersRepository.findById({id: userId})

      if(!user){
        throw new Error('User not found.')
      }
      
      const recipe = await this.recipeRepository.findById({id: recipeId})

      if(!recipe){
        throw new Error('Recipe not found.')
      }

      const favorite = await this.favoriteRepository.findById({id: favoriteId})

      if(!favorite){
        throw new Error('Favorite not found.')
      }
      
      const deleteFavorite = await this.favoriteRepository.delete({
        id:favoriteId,
        userId:userId,
        recipesId:recipeId
      })

      return {
        deleteFavorite
      }
    }
}