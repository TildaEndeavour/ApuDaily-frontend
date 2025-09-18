import type {Delta} from "quill";
import  Thumbnail from "./Thumbnail.ts";
import type User from "../../auth/model/User.ts";
import type Category from "./Category.ts";
import type Tag from "./Tag.ts";
import thumbnail from "./Thumbnail.ts";

class Post {
    id: number;
    author: User | null;
    thumbnail: Thumbnail | null;
    title: string;
    description: string;
    content: Delta;
    viewCount: number;
    category: Category;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, author: User | null, thumbnail: thumbnail,
                title: string, description: string, content: Delta,
                viewCount: number, category: Category, tags: Tag[],
                createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.author = author;
        this.thumbnail = thumbnail;
        this.title = title;
        this.description = description;
        this.content = content;
        this.viewCount = viewCount;
        this.category = category;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Post;