import { CreateLikeDTO } from "@/domain/dtos/like/create-like-dto"
import { DeleteLikeDTO } from "@/domain/dtos/like/delete-like-dto"
import { FindLikeByIdDTO } from "@/domain/dtos/like/find-like-by-id-dto"
import { Like } from "@/domain/entities/like"

export interface LikeRepository{
   create(data: CreateLikeDTO):Promise<Like>
   delete(data: DeleteLikeDTO):Promise<void>
   findById(id: FindLikeByIdDTO): Promise<Like| null>
}