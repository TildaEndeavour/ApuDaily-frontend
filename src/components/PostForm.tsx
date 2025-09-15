import ThumbnailLoader from "./ThumbnailLoader.tsx";
import {Save, Trash} from "lucide-react";
import {TagBubble} from "./TagBubble.tsx";
import QuillEditor from "./Editor.tsx";
import React, {type FormEvent, type RefObject} from "react";
import type Category from "../model/Category.ts";
import type Quill from "quill";
import type Thumbnail from "../model/Thumbnail.ts";

interface PostFormProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    thumbnail: Thumbnail | null;
    onThumbnailChange: (thumbnail: Thumbnail) => void;
    editorRef: RefObject<Quill | null>
    content: string;
    onContentChange: (content: string) => void;
    tags: { name: string }[];
    onAddTag: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onDeleteTag: (tagName: string) => void;
    tagInputRef: React.RefObject<HTMLInputElement | null>;
    categories: Category[];
    errors: { title: string; tags: string; content: string };
    onClearTitleError: () => void;
    onClearTagsError: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
     handleSubmit,
     thumbnail,
     onThumbnailChange,
     editorRef,
     content,
     onContentChange,
     tags,
     onAddTag,
     onDeleteTag,
     tagInputRef,
     categories,
     errors,
     onClearTitleError,
     onClearTagsError}) => {

    return (
        <form className="w-3/4 flex flex-col gap-4 mt-12" onSubmit={(event) => handleSubmit(event)}>
            <div className="flex gap-4">
                <ThumbnailLoader
                    thumbnail={thumbnail}
                    setThumbnail={onThumbnailChange}
                />
                <section className="w-full p-4 flex flex-col gap-4">
                    <p className="flex flex-row border-b-1 pb-2">
                        <label htmlFor="Title" className="my-auto">Title: </label>
                        <input
                            name="title" placeholder="Enter title..."
                            className={"h-12 p-4 ml-4 flex-grow rounded-3xl" + (errors.title ? " bg-red-300" : "")}
                            onFocus={onClearTitleError}
                        />
                    </p>
                    <p className="flex flex-col border-b-1">
                        <label htmlFor="description" className="my-auto">Description: </label>
                        <textarea name="description"  placeholder="Enter description" className="h-24 max-h-31 p-4 w-full"/>
                    </p>
                </section>
                <section className="flex flex-col gap-4">
                    <button type="submit" className="rounded-3xl border-gray-100 w-48 h-16 hover:bg-green-300 shadow-2xl/30">Publish</button>
                    <button type="button" className="rounded-3xl border-gray-100 w-48 h-16 hover:bg-green-300 shadow-2xl/30">Preview</button>
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
                    <select name="categoryId" className="ml-2 p-2 w-44 rounded-2xl border-gray-200 border-1">
                        {categories.map(category => {
                            return <option key={category.slug} value={category.slug}>{category.name}</option>
                        })}
                    </select>
                </p>
                <p className="flex flex-row p-4 w-full">
                    <label htmlFor="tagsId" className="my-auto">Tags: </label>
                    <input name="tagsId"
                           placeholder="Append tag"
                           ref={tagInputRef}
                           onKeyDown={(event) => onAddTag(event)}
                           className={"h-12 p-4 ml-4 rounded-3xl" + (errors.tags ? " bg-red-200" : "")}
                           onFocus={onClearTagsError}
                    />
                </p>
            </section>
            <section className="overflow-x-auto flex flex-row gap-1">
                {tags.map(tag => {
                    return <TagBubble key={tag.name} name={tag.name} onDelete={() => onDeleteTag(tag.name)}/>
                })}
            </section>
            <QuillEditor
                ref={editorRef}
                value={content}
                onChange={onContentChange}
            />
        </form>
    );
}

export default PostForm;