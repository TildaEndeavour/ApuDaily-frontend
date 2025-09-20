import {type FormEvent, useState} from "react";
import PostForm from "../components/PostForm.tsx";
import type {Post} from "../model/Post.ts";

const NewPost = () => {

    const [post, setPost] = useState<Post>({
        id: null,
        author: null,
        thumbnail: null,
        title: "",
        description: "",
        content: "",
        category: null,
        tags: [],
        createdAt: null,
        updatedAt: null
    });

    //const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(post);
    }
    
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <PostForm
                post={post}
                onChangePost={setPost}
                onSubmitPost={handleSubmit}
            />
        </div>
    );
}


export default NewPost;