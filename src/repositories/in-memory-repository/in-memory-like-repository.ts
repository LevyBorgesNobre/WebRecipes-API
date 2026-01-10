import { Like } from "@/domain/entities/like";
import { LikeRepository } from "../like-repository";
import { randomUUID } from "crypto";
import { CreateLikeDTO } from "@/domain/dtos/like/create-like-dto";
import { DeleteLikeDTO } from "@/domain/dtos/like/delete-like-dto";
import { FindLikeByIdDTO } from "@/domain/dtos/like/find-like-by-id-dto";

export class InMemoryLikeRepository implements LikeRepository {
   public likes : Like[] = []

    async create(data: CreateLikeDTO): Promise<Like> {
        const like : Like = {
            id: randomUUID(),
            userId: data.userId,
            recipesId: data.recipesId,
        }
        
        this.likes.push(like)
        return like
    }
    
    async delete(data: DeleteLikeDTO): Promise<void> {
        const like = this.likes.findIndex(like=> like.id === data.id)

       if (like === -1) {
       throw new Error('Recipe not found');
       }
          this.likes.splice(like, 1)[0];
    }

    async findById(id: FindLikeByIdDTO): Promise<Like | null> {
        const like = this.likes.find(like=> like.id === id.id)

        if(!like){
          throw new Error('Recipe not found')
        }

        return like
    }
  
}