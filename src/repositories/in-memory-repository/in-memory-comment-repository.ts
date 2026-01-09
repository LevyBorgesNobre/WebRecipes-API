import { Comment } from "@/domain/entities/comment";
import { CommentRepository } from "../comment-repository";
import { randomUUID } from "crypto";
import { CreateCommentDTO } from "@/domain/dtos/comment/create-comment-dto";
import { FindCommentByIdDTO } from "@/domain/dtos/comment/find-comment-by-id-dto";
import { UpdateCommentDTO } from "@/domain/dtos/comment/update-comment-dto";
import { DeleteCommentDTO } from "@/domain/dtos/comment/delete-comment-dto";

export class InMemoryCommentRepository implements CommentRepository {

   public comments: Comment[] = []

    async create(data: CreateCommentDTO): Promise<Comment> {
        const comment: Comment = {
            id:randomUUID(),
            userId: data.userId,
            recipesId: data.recipesId,
            comment: data.comment
        }

        this.comments.push(comment)
        return comment
    }

    async findById(id: FindCommentByIdDTO): Promise<Comment | null> {
        const comment = this.comments.find(comment=> comment.id === id.id)

        if(!comment){
            throw new Error('Comment not found.')
        }

        return comment
    }
   
    async update(data: UpdateCommentDTO): Promise<Comment> {
          const commentIndex = this.comments.findIndex(
            (comment) => comment.recipesId === data.recipesId && comment.userId === data.userId && comment.id ===  data.commentId
          );
        
          if (commentIndex === -1) {
            throw new Error("Recipe not found");
          }
        
          const current = this.comments[commentIndex];
        
          const updated = {
            ...current,
            ...data,
          } as Comment;
        
          this.comments[commentIndex] = updated;
        
          return updated;
    }

   async delete(data: DeleteCommentDTO): Promise<Comment> {
    
     const index = this.comments.findIndex(u => u.id === data.commentId && u.userId === data.userId && u.recipesId === data.recipesId);

     if (index === -1) {
     throw new Error('Comment not found');
    }
     return this.comments.splice(index, 1)[0];
    }
}