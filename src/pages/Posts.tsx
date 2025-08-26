import {useLoaderData} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";
import type Post from "../model/Post.ts";

const Posts = () => {

    const posts = useLoaderData();

    return (
        <div className="w-3/4 h-screen flex flex-wrap justify-center gap-12 pt-12">
            {posts.content.map((post: Post) => {
                return <PostCard data={post}/>
            })}
        </div>
    );
}

export default Posts;

export async function loader() {
    const response = await fetch(import.meta.env.VITE_BASE_URL + '/posts');
    if (!response.ok) {
        return { isError: true, message: 'Could not fetch events.' };
    } else {
        return response;
    }
}