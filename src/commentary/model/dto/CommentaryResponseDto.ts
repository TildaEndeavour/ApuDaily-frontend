export interface CommentaryResponseDto{
    id: number,
    userId: number,
    postId: number,
    parentCommentaryId: number,
    content: string
}