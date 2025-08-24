import type {Delta} from "quill";

class Post {
    id: number,
    title: string,
    description: string,
    content: Delta
}

export default Post;