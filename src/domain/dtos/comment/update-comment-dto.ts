export interface UpdateCommentDTO {
    userId:    string;
    recipesId: string;
    commentId: string;
    data:{
        comment: string
    }
}