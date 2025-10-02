import type {Tag} from "./Tag.ts";
import type {Category} from "./Category.ts";
import type {UserProfile} from "./UserProfile.ts";

export interface PostFilter{
    searchQuery: string,
    users: UserProfile[],
    tags: Tag[],
    category: Category[]
}