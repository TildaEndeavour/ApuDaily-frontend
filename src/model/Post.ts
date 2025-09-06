import type {Delta} from "quill";

class Post {
    id: number;
    author: string | null;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    content: Delta;
    createdAt: Date;
    updatedAt: Date;
}

export default Post;