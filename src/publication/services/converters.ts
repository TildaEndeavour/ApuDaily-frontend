import type {PostFilter} from "../model/PostFilter.ts";
import type {PostSearchRequestDto} from "../model/dto/PostSearchRequestDto.ts";

export const convertPostFilterToDto = (filter: PostFilter): PostSearchRequestDto =>{
    return {
        searchQuery: filter.searchQuery,
        usersId: filter.users.map(user => user.id),
        tagsId: filter.tags.map(tag => tag.id),
        categoryId: filter.category[0] ? filter.category[0].id : null
    };
}