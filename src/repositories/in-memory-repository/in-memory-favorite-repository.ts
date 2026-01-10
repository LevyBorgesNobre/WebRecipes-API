import { Favorite } from "@/domain/entities/favorite";
import { randomUUID } from "crypto";
import { FavoriteRepository } from "../favorite-repository";
import { CreateFavoriteDTO } from "@/domain/dtos/favorite/create-favorite";
import { DeleteFavoriteDTO } from "@/domain/dtos/favorite/delete-favorite-dto";
import { FindFavoriteByIdDTO } from "@/domain/dtos/favorite/find-favorite-by-id-dto";

export class InMemoryFavoriteRepository implements FavoriteRepository  {
   public favorites : Favorite[] = []

    async create(data: CreateFavoriteDTO): Promise<Favorite> {
        const favorite : Favorite = {
            id: randomUUID(),
            userId: data.userId,
            recipesId: data.recipesId,
        }
        
        this.favorites.push(favorite)
        return favorite
    }
    
    async delete(data: DeleteFavoriteDTO): Promise<void> {
        const like = this.favorites.findIndex(like=> like.id === data.id)

       if (like === -1) {
       throw new Error('Recipe not found');
       }
        this.favorites.splice(like, 1)[0];
    }

    async findById(id: FindFavoriteByIdDTO): Promise<Favorite | null> {
        const favorite = this.favorites.find(like=> like.id === id.id)

        if(!favorite){
          throw new Error('Recipe not found')
        }

        return favorite
    }
  
}