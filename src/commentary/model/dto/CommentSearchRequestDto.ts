export interface CommentSearchRequestDto {
    id: number | null,
    userId: number | null,
    postId: number | null,
    parentCommentaryId: number | null
}