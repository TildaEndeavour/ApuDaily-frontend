export interface PostCreateRequestDto{
    authorId?: number;
    thumbnailId?: number;
    title: string;
    description: string;
    content: string;
    categoryId: number;
    tagsId: number[];
}