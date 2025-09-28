export interface PostUpdateRequestDto{
    postId: number;
    authorId?: number | null;
    thumbnailId?: number;
    title: string;
    description: string;
    content: string;
    categoryId: number;
    tagsId: number[];
}