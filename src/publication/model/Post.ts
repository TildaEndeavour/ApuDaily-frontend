import  Thumbnail from "./Thumbnail.ts";
import type {Category} from "./Category.ts";
import type {UserProfile} from "../../user/model/UserProfile.ts";
import type {Tag} from "./Tag.ts";

export interface Post {
    id: number | null;
    user?: UserProfile | null;
    thumbnail?: Thumbnail | null;
    title: string;
    description: string;
    content: string;
    category: Category | null;
    tags: Tag[] | null;
    commentariesCount: number,
    upvotesCount: number,
    downvotesCount: number,
    viewCount: number,
    createdAt: Date | null;
    updatedAt: Date | null;
}