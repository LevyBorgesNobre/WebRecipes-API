import { CreateCommentDTO } from "@/domain/dtos/comment/create-comment-dto"
import { Comment } from "@/domain/entities/comment"
import { FindCommentByIdDTO } from "@/domain/dtos/comment/find-comment-by-id-dto"
import { UpdateCommentDTO } from "@/domain/dtos/comment/update-comment-dto"
import { DeleteCommentDTO } from "@/domain/dtos/comment/delete-comment-dto"

export interface CommentRepository {
    create(data: CreateCommentDTO): Promise<Comment>
    findById(id: FindCommentByIdDTO): Promise<Comment | null>
    update(data: UpdateCommentDTO):Promise<Comment>
    delete(data: DeleteCommentDTO):Promise<void>
}
