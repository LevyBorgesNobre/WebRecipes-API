import { FavoriteRepository } from "@/repositories/favorite-repository";
import { RecipeRepository } from "@/repositories/recipe-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Favorite } from "@/domain/entities/favorite";

interface CreateFavoriteUseCaseRequest {
    userId:    string;
    recipeId:  string;
}

interface CreateFavoriteUseCaseResponse {
  favorite: Favorite
}

export class CreateFavoriteUseCase{
    constructor(
    private  usersRepository: UsersRepository,
    private  recipeRepository: RecipeRepository,
    private  favoriteRepository: FavoriteRepository
    ){}

    async create({
      userId,
      recipeId
    }: CreateFavoriteUseCaseRequest): Promise<CreateFavoriteUseCaseResponse>{
      
      const user = await this.usersRepository.findById({id: userId})

      if(!user){
        throw new Error('User not found.')
      }
      
      const recipe = await this.recipeRepository.findById({id: recipeId})

      if(!recipe){
        throw new Error('Recipe not found.')
      }

      const favorite = await this.favoriteRepository.create({
        userId: userId,
        recipesId: recipeId
      })

      return {
        favorite
      }
    }
}