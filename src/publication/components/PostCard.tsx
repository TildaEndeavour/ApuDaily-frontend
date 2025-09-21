import {ImageOff} from "lucide-react";
import type {Post} from "../model/Post.ts";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const PostCard: React.FC<{post: Post}> = ({post}) => {

    return (
        <div className="p-4 w-104 h-120 border rounded-3xl shadow-2xl flex flex-col">
            <section className="w-full h-6/12 flex flex-row justify-center items-center">
                {post.thumbnail ? (
                    <img className="rounded-2xl w-full h-full object-cover" src={BASE_URL + post.thumbnail.url} alt="thumbnail"/>
                ) : (
                    <div className="rounded-2xl w-full h-full flex justify-center items-center bg-gray-200">
                        <ImageOff size="100%" color="gray" strokeWidth={1} className="w-full h-full"/>
                    </div>
                )}
            </section>
            <p className="mt-3 mb-4 text-sm text-gray-800">{post.user ? post.user.username : "Anonym"}</p>
            <section className="gap-4 flex flex-col h-60">
                <p className="text-lg font-semibold">{post.title}</p>
                <p>{post.description}</p>
            </section>
            <section className="mt-4 flex flex-row items-center justify-between">
                <p className="p-2 bg-gray-200 rounded-3xl w-fit h-fit text-xs">{post.category.name}</p>
                <p>
                    {new Date(post.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    })}
                </p>
            </section>
        </div>
    );
}

export default PostCard;