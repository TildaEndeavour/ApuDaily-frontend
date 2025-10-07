export interface Commentary{
    id: number,
    userId: number,
    postId: number,
    parentCommentary: number,
    content: string
}