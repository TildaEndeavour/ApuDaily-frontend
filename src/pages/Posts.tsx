import {useState} from "react";
import POSTS from "../data/posts.ts";
import PostCard from "../components/PostCard.tsx";

const Posts = () => {

    const [posts, setPosts] = useState(POSTS);

    return (
        <div className="px-auto flex flex-wrap gap-8 border">
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    );
}

export default Posts;