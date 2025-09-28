import  Thumbnail from "./Thumbnail.ts";
import type User from "../../auth/model/User.ts";
import type Tag from "./Tag.ts";
import type {Category} from "./Category.ts";

export interface Post {
    id: number | null;
    user?: User | null;
    thumbnail?: Thumbnail | null;
    title: string;
    description: string;
    content: string;
    category: Category | null;
    tags: Tag[] | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}