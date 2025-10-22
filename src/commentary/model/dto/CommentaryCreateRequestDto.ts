export interface CommentaryCreateRequestDto{
    postId: number,
    parentCommentId: number | null,
    content: string
}