import React from "react";
import type {Post} from "../model/Post.ts";
import DOMPurify from "dompurify";
import {Tag} from "lucide-react";

const PostPreview: React.FC<{postPreview : Post}>= ({postPreview}) => {
    return (
        <div className="h-screen w-300 py-4">
            <div className="mt-10">
                <article className="px-16 py-12 animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both
                            bg-gray-100 rounded-3xl shadow-2xl">

                    <section className="flex flex-row justify-between mb-8">
                        <h4 className="font-bold">{postPreview.category?.name}</h4>
                        <span>
                {postPreview.createdAt && new Date(postPreview.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC'
                })}
            </span>
                    </section>
                    <h1 className="mb-6 ">
                        {postPreview.title}
                    </h1>
                    <div className="h-fit ql-editor"
                         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postPreview.content) }}>
                    </div>
                </article>
                {(postPreview.tags && postPreview.tags?.length > 0) && <section className="px-4 py-4 my-5 flex flex-row gap-4 bg-gray-100 rounded-3xl shadow-2xl">
                    {postPreview.tags && postPreview.tags.map(tag => {
                        return <span key={tag.name} className="p-2 flex flex-row gap-2 bg-gray-100 rounded-3xl border-1"><Tag size={24} strokeWidth={1}/>{tag.name}</span>
                    })}
                </section>}
                <div className="mt-20"> </div>
            </div>
        </div>
    );
}

export default PostPreview;