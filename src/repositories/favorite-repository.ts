import { Favorite } from "@/domain/entities/favorite"
import { CreateFavoriteDTO } from "@/domain/dtos/favorite/create-favorite"
import { DeleteFavoriteDTO } from "@/domain/dtos/favorite/delete-favorite-dto"
import { FindFavoriteByIdDTO } from "@/domain/dtos/favorite/find-favorite-by-id-dto"

export interface FavoriteRepository {
       create(data: CreateFavoriteDTO):Promise<Favorite>
       delete(data: DeleteFavoriteDTO):Promise<Favorite>
       findById(id: FindFavoriteByIdDTO): Promise<Favorite| null>
}