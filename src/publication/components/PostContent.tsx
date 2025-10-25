import type {Post} from "../model/Post.ts";
import DOMPurify from "dompurify";
import {Tag} from "lucide-react";
import React from "react";

const PostContent: React.FC<{content: Post}> = ({content}) => {
    return (
        <div className="animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both
                                bg-gray-100 rounded-3xl shadow-2xl px-16 py-12">
            <article>

                <section className="flex flex-row justify-between mb-8">
                    <h4 className="font-bold">{content.category?.name}</h4>
                    <span>
                                {content.createdAt && new Date(content.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                })}
                             </span>
                </section>
                <h1 className="mb-6 ">
                    {content.title}
                </h1>
                <div className="h-fit ql-editor"
                     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }}>
                </div>
            </article>
            {(content.tags && content.tags?.length > 0) &&
            <section className="px-4 py-4 flex flex-wrap gap-4 overflow-x-auto">
                {content.tags && content.tags.map(tag => {
                    return <span key={tag.name} className="p-2 flex flex-row gap-2 bg-gray-100 rounded-3xl border-1"><Tag size={24} strokeWidth={1}/>{tag.name}</span>
                })}
            </section>}
        </div>
    );
}

export default PostContent;