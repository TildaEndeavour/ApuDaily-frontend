export interface PostSearchRequestDto{
    searchQuery: string,
    usersId: number[];
    tagsId: number[];
    categoryId: number | null;
}