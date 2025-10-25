export interface CommentaryCreateRequestDto{
    postId: number,
    parentCommentId: number | null | undefined,
    content: string
}