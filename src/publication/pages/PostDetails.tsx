import type {Post} from "../model/Post.ts";
import {useLoaderData} from "react-router-dom";
import DOMPurify from "dompurify";
import {Tag} from "lucide-react";

const PostDetails = () => {

    const response = useLoaderData();
    const post:Post = response.body;

    return(
        <div className="w-2/3 my-8 h-fit px-16 py-12 bg-gray-100 rounded-3xl shadow-2xl
                        animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both">
            <article>
                <section className="flex flex-row justify-between mb-8">
                    <h4 className="font-bold">{post.category?.name}</h4>
                    <span>
                    {new Date(post.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    })}
                </span>
                </section>
                <h1 className="mb-6 ">
                    {post.title}
                </h1>
                <div className="h-fit"
                     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}>
                </div>
            </article>
            <section className="my-5 bg-gray-100 rounded-3xl shadow-2xl">
                {post.tags && post.tags.map(tag => {
                    return <span className="flex flex-row gap-2"><Tag size={24} strokeWidth={1}/>{tag.name}</span>
                })}
            </section>
        </div>
    );
}

export default PostDetails;