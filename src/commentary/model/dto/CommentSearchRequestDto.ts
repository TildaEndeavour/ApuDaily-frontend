export interface CommentSearchRequestDto {
    commentId: number | null,
    userId: number | null,
    postId: number | null,
    parentCommentId: number | null
}