class Thumbnail{
    id: number;
    postId: number;
    statusId: number;
    filename: string;
    extension: string;
    url: string;
    createdAt: Date;

    constructor(id: number, statusId: number,
                postId: number
                , filename: string,
                extension: string, url: string, createdAt: Date) {
        this.id = id;
        this.statusId = statusId;
        this.postId = postId;
        this.filename = filename;
        this.extension = extension;
        this.url = url;
        this.createdAt = createdAt;
    }
}

export default Thumbnail;