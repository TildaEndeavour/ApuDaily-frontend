import ThumbnailLoader from "./ThumbnailLoader.tsx";
import {Save, Trash} from "lucide-react";
import {TagBubble} from "./TagBubble.tsx";
import QuillEditor from "./Editor.tsx";
import React, {type FormEvent, useRef, useState} from "react";
import type Quill from "quill";
import type Thumbnail from "../model/Thumbnail.ts";
import ModalCard from "../../shared/components/ModalCard.tsx";
import DOMPurify from "dompurify";
import {isTag} from "../services/validation.ts";
import type {Post} from "../model/Post.ts";
import {useLoaderData} from "react-router-dom";
import type {Category} from "../model/Category.ts";

const PostForm: React.FC<{
    post: Post,
    onChangePost: (post: Post) => void,
    onSubmitPost: (event: FormEvent<HTMLFormElement>) => void
    }> = ({post,onChangePost, onSubmitPost}) => {

    const availableCategories = useLoaderData();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const editorRef = useRef<Quill | null>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    const updatePostField = <K extends keyof Post>(key: K, value: Post[K]) => {
        onChangePost({ ...post, [key]: value });
    };

    const handleThumbnailChange = (thumbnail: Thumbnail) => {
        const updatedPost: Post = {
            ...post,
            thumbnail: thumbnail
        }
        onChangePost(updatedPost);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = availableCategories.find((c: Category) => c.slug === e.target.value);
        if (selectedCategory) updatePostField("category", selectedCategory);
    };

    const addTag = (name: string) => {
        if (isTag(name) && post.tags?.every(tag => tag.name.toLowerCase() !== name.toLowerCase())) {
            updatePostField("tags", [...(post.tags ?? []), { id: null, name }]);
        }
    };

    const removeTag = (name: string) => {
        updatePostField("tags", post.tags?.filter(tag => tag.name !== name) ?? []);
    };

    return (
        <form className="w-3/4 flex flex-col gap-4 mt-12" onSubmit={(event) => onSubmitPost(event)}>
            <div className="flex gap-4">
                <ThumbnailLoader
                    thumbnail={post.thumbnail ? post.thumbnail : null}
                    setThumbnail={handleThumbnailChange}
                />
                <section className="w-full p-4 flex flex-col gap-4">
                    <p className="flex flex-row border-b-1 pb-2">
                        <label htmlFor="Title" className="my-auto">Title: </label>
                        <input
                            name="title" placeholder="Enter title..."
                            className="h-12 p-4 ml-4 flex-grow rounded-3xl"
                            onChange={(e) => updatePostField("title", e.target.value)}
                        />
                    </p>
                    <p className="flex flex-col border-b-1">
                        <label htmlFor="description" className="my-auto">Description: </label>
                        <textarea
                            name="description"
                            placeholder="Enter description"
                            className="h-24 max-h-31 p-4 w-full"
                            onChange={(e) => updatePostField("description", e.target.value)}
                        />
                    </p>
                </section>
                <section className="flex flex-col gap-4">
                    <button type="submit" className="rounded-3xl border-gray-100 w-48 h-16 hover:bg-green-300 shadow-2xl/30">Publish</button>
                    <button type="button"
                            className="rounded-3xl border-gray-100 w-48 h-16 hover:bg-green-300 shadow-2xl/30"
                            onClick={() => setIsPreviewOpen(true)}
                    >Preview</button>
                    <ModalCard isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
                        <div className="h-full overflow-y-auto ql-editor"
                             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}>
                        </div>
                    </ModalCard>
                    <p className="flex flex-row gap-4 justify-center">
                        <button type="button" className="rounded-3xl border-gray-100 w-fit h-16 p-4 hover:bg-yellow-200 shadow-2xl/30">
                            <Save
                                size={36}
                            />
                        </button>
                        <button type="button" className="rounded-3xl border-gray-100 w-fit h-16 p-4 hover:bg-red-300 shadow-2xl/30">
                            <Trash
                                size={36}
                            />
                        </button>
                    </p>
                </section>
            </div>
            <section className="flex flex-row w-full border-b-1">
                <p className="flex flex-row p-4">
                    <label htmlFor="categoryId" className="my-auto">Category: </label>
                    <select
                        name="categoryId"
                        className="ml-2 p-2 w-44 rounded-2xl border-gray-200 border-1"
                        onChange={handleCategoryChange}
                    >
                        {availableCategories.map((category: Category) => {
                            return <option key={category.slug} value={category.slug}>{category.name}</option>
                        })}
                    </select>
                </p>
                <p className="flex flex-row p-4 w-full">
                    <label htmlFor="tagsId" className="my-auto">Tags: </label>
                    <input name="tagsId"
                           placeholder="Append tag"
                           ref={tagRef}
                           onKeyDown={(e) => {
                               if (e.key === "Enter" && tagRef.current) {
                                   e.preventDefault();
                                   addTag(tagRef.current.value);
                                   tagRef.current.value = "";
                               }
                           }}
                           className="h-12 p-4 ml-4 rounded-3xl"
                    />
                </p>
            </section>
            <section className="overflow-x-auto flex flex-row gap-1">
                {post.tags && post.tags.map(tag => {
                    return <TagBubble key={tag.name} name={tag.name} onDelete={() => removeTag(tag.name)}/>
                })}
            </section>
            <QuillEditor
                ref={editorRef}
                value={post.content}
                onChange={(content) => updatePostField("content", content)}
            />
        </form>
    );
}

export default PostForm;