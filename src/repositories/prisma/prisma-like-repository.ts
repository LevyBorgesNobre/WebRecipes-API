import { Like } from "@/domain/entities/like";
import { LikeRepository } from "../like-repository";
import { db } from '../../lib/prisma'
import { CreateLikeDTO } from "@/domain/dtos/like/create-like-dto";
import { DeleteLikeDTO } from "@/domain/dtos/like/delete-like-dto";
import { FindLikeByIdDTO } from "@/domain/dtos/like/find-like-by-id-dto";

export class PrismaLikeRepository implements LikeRepository {

  async create(data: CreateLikeDTO): Promise<Like> {
      const like = await db.like.create({
        data
      })
      return like
  }

  async delete(data: DeleteLikeDTO): Promise<void> {
      await db.like.delete({
        where:data
      })
  }

  async findById(id: FindLikeByIdDTO): Promise<Like | null> {
    const like = await db.like.findUnique({
      where:{
        id: id.id
      },
      include:{
        user:true,
        recipes:true
      }
    })

    return like
  }
}