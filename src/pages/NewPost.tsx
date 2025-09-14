import React, {type FormEvent, useRef, useState} from "react";
import  Category from "../model/Category.ts";
import {useLoaderData} from "react-router-dom";
import  Tag from "../model/Tag.ts";
import {isContentEmpty, isPostTitle, isTag} from "../util/validation.ts";
import PostForm from "../components/PostForm.tsx";
import type Quill from "quill";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_VER: string = import.meta.env.VITE_API_VER;

const NewPost = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const tagInput = useRef<HTMLInputElement>(null);
    const categories: Category[] = useLoaderData();
    const [errors, setErrors] = useState({
        title: "",
        tags: "",
        content: ""
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.set("author", "null");

        const title = formData.get('title');

        if(!title || !isPostTitle(title.toString())) return setErrors(prevErrors => ({...prevErrors, title: "Please enter valid title"}));
        else setErrors(prevErrors => ({...prevErrors, title: ""}));

        if(thumbnailUrl) formData.set("thumbnailUrl", thumbnailUrl);
        else formData.set("thumbnailUrl", "");


        if(!isContentEmpty(content)) formData.set("content", content);
        else return setErrors(prevErrors => ({...prevErrors, content: "Please fill publication content"}));

        const category = categories.filter(category => category.slug === formData.get("category"));
        formData.set("category", category[0].id.toString());

        try {
            const tags: Tag[] = await loadTagsToServer();
            formData.set("tags", tags.map(tag => tag.id).toString());

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await fetch(BASE_URL + API_VER + '/posts', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to submit post');
            console.log('Post submitted:', await response.json());
        } catch (error: unknown) {

            let errorMessage = 'Unknown error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setErrors(prevErrors => ({
                ...prevErrors,
                tags: errorMessage === "Tags upload error" ? "Failed to upload tags" : prevErrors.tags,
                content: errorMessage === "Failed to submit post" ? "Failed to submit post" : prevErrors.content,
            }));
        }

    }

    const loadTagsToServer = async() => {

        const response = await fetch(BASE_URL + API_VER + "/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tags.map(tag => tag.name.toLowerCase())),
        });

        if (!response.ok) throw new Error("Tags upload error");

        return await response.json();
    }

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && tagInput.current) {
            event.preventDefault();
            const value = tagInput.current.value;
            if (isTag(value) && tags.every(tag => tag.name.toLowerCase() !== value.toLowerCase())){
                setTags(prevTags => [...prevTags, { id: null, name: value }]);
                setErrors(prevErrors => ({...prevErrors, tags: ""}));
                tagInput.current.value = "";
            }else{
                setErrors(prevErrors => ({...prevErrors, tags: "Please, enter valid tag"}));
            }
        }
    }

    const handleDeleteTag = (tagToDelete: string) =>
        setTags(prevTags => prevTags.filter(tag => tag.name !== tagToDelete));

    const handleThumbnailChange = (url: string | null) => setThumbnailUrl(url);

    const handleContentChange = (newContent: string) => setContent(newContent);

    const clearTitleError = () => setErrors(prevErrors => ({ ...prevErrors, title: "" }));

    const clearTagsError = () => setErrors(prevErrors => ({ ...prevErrors, tags: "" }));

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <PostForm
                handleSubmit={handleSubmit}
                thumbnailUrl={thumbnailUrl}
                onThumbnailChange={handleThumbnailChange}
                editorRef={quillRef}
                content={content}
                onContentChange={handleContentChange}
                tags={tags}
                onAddTag={handleAddTag}
                onDeleteTag={handleDeleteTag}
                tagInputRef={tagInput}
                categories={categories}
                errors={errors}
                onClearTitleError={clearTitleError}
                onClearTagsError={clearTagsError}
            />
        </div>
    );
}


export default NewPost;