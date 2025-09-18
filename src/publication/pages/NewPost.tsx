import React, {type FormEvent, useRef, useState} from "react";
import  Category from "../model/Category.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import  Tag from "../model/Tag.ts";
import {isContentEmpty, isPostTitle, isTag} from "../services/validation.ts";
import PostForm from "../components/PostForm.tsx";
import type Quill from "quill";
import type Thumbnail from "../model/Thumbnail.ts";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_VER: string = import.meta.env.VITE_API_VER;

const NewPost = () => {

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
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
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const title = formData.get('title');

        if(!title || !isPostTitle(title.toString())) return setErrors(prevErrors => ({...prevErrors, title: "Please enter valid title"}));
        else setErrors(prevErrors => ({...prevErrors, title: ""}));

        if(thumbnail) formData.set("thumbnailId", thumbnail.id.toString());
        else formData.set("thumbnailId", "");

        if(!isContentEmpty(quillRef.current!.getText().trim())) formData.set("content", content);
        else return setErrors(prevErrors => ({...prevErrors, content: "Please fill publication content"}));

        const category = categories.filter(category => category.slug === formData.get("categoryId"));
        formData.set("categoryId", category[0].id.toString());

        try {
            const tags: Tag[] = await loadTagsToServer();
            formData.set("tagsId", tags.map(tag => tag.id).toString());

            const response = await fetch(BASE_URL + API_VER + '/posts', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to submit post');
            navigate('/posts');
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

    const handleThumbnailChange = (thumbnail: Thumbnail) => setThumbnail(thumbnail);

    const handleContentChange = (newContent: string) => setContent(newContent);

    const clearTitleError = () => setErrors(prevErrors => ({ ...prevErrors, title: "" }));

    const clearTagsError = () => setErrors(prevErrors => ({ ...prevErrors, tags: "" }));

    const openPreview = () => setIsPreviewOpen(true);

    const closePreview = () => setIsPreviewOpen(false);

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <PostForm
                handleSubmit={handleSubmit}
                thumbnail={thumbnail}
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
                isPreviewOpen={isPreviewOpen}
                onOpenPreview={openPreview}
                onClosePreview={closePreview}
            />
        </div>
    );
}


export default NewPost;