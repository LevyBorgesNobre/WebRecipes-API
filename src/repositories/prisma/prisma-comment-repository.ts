import { CommentRepository } from "../comment-repository";
import { db } from '@/lib/prisma'
import { CreateCommentDTO } from "@/domain/dtos/comment/create-comment-dto";
import { Comment } from "@/domain/entities/comment";
import { FindCommentByIdDTO } from "@/domain/dtos/comment/find-comment-by-id-dto";
import { UpdateCommentDTO } from "@/domain/dtos/comment/update-comment-dto";
import { DeleteCommentDTO } from "@/domain/dtos/comment/delete-comment-dto";
  
export class PrismaCommentRepository implements CommentRepository {
    async create(data: CreateCommentDTO): Promise<Comment> {
        const comment = await db.comment.create({
            data
        })
        return comment
    }

    async findById(id: FindCommentByIdDTO): Promise<Comment | null> {
        const comment = await db.comment.findUnique({
            where:{
                id:id.id
            },
        })
        return comment
    }

    async update(data: UpdateCommentDTO): Promise<Comment> {
      const comment = await db.comment.update({
        where:{
           id:data.commentId,
           userId:data.userId,
           recipesId:data.recipesId,
        },
        data:{
            ...data,
        }
      })
      return comment
  }

  async delete(data: DeleteCommentDTO): Promise<Comment> {
      const comment = await db.comment.delete({
        where:{
            userId: data.userId,
            recipesId: data.recipesId,
            id: data.commentId
        }
      })
      return comment
  }
}
