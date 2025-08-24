class Post {
    id: number;
    author: string;
    title: string;
    content: string;

    constructor(author: string, title: string, content: string) {
        this.id = Date.now();
        this.author = author;
        this.title = title;
        this.content = content;
    }
}

export default Post;