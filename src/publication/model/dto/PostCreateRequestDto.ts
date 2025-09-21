export interface PostCreateRequestDto{
    authorId?: number | null;
    thumbnailId?: number;
    title: string;
    description: string;
    content: string;
    categoryId: number;
    tagsId: number[];
}