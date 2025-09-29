import {ImageOff} from "lucide-react";
import type {Post} from "../model/Post.ts";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const PostCard: React.FC<{onSelect:() => void; post: Post; isGridLayout: boolean}> = ({onSelect, post, isGridLayout}) => {

    const gridLayout = (
        <div onClick={onSelect}
             className="p-4 w-104 h-120 border rounded-3xl shadow-2xl
             flex flex-col cursor-pointer
             animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both"
        >
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
                <p className="p-2 bg-gray-200 rounded-3xl w-fit h-fit text-xs">{post.category!.name}</p>
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
    )

    const rowLayout = (
        <div onClick={onSelect}
             className="p-4 w-full h-40 border rounded-3xl shadow-2xl flex flex-row cursor-pointer gap-4
             animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both"
        >
            <section className="h-full w-1/10 flex flex-row justify-center items-center">
                {post.thumbnail ? (
                    <img className="rounded-2xl w-full h-full object-cover" src={BASE_URL + post.thumbnail.url} alt="thumbnail"/>
                ) : (
                    <div className="rounded-2xl w-full h-full flex justify-center items-center bg-gray-200">
                        <ImageOff size="100%" color="gray" strokeWidth={1} className="w-full h-full"/>
                    </div>
                )}
            </section>
            <section className="w-7/10 overflow-x-clip overflow-y-clip">
                <section className="flex flex-row gap-2 items-center">
                    <p className="text-smtext-gray-800">{post.user ? post.user.username : "Anonym"}</p>
                    <p className="p-2 bg-gray-200 rounded-3xl w-fit h-fit text-xs">{post.category!.name}</p>
                </section>
                <section className="gap-4 flex flex-col">
                    <p className="text-lg font-semibold">{post.title}</p>
                    <p>{post.description}</p>
                </section>
            </section>
            <section className="w-2/10 flex flex-row justify-end">
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

    return isGridLayout ? gridLayout : rowLayout;
}

export default PostCard;