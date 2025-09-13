import {type FormEvent, useRef, useState} from "react";
import QuillEditor from "../components/Editor.tsx";
import ThumbnailLoader from "../components/ThumbnailLoader.tsx";
import {Save, Trash} from "lucide-react";
import type Category from "../model/Category.ts";
import {useLoaderData} from "react-router-dom";
import {TagBubble} from "../components/TagBubble.tsx";
import  Tag from "../model/Tag.ts";
import {isPostTitle, isTag} from "../util/validation.ts";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_VER: string = import.meta.env.VITE_API_VER;

const NewPost = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
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
        const fd = new FormData(form);

        const title = fd.get("title");
        if(!title || !isPostTitle(title.toString())) {
            setErrors(prevErrors => ({...prevErrors, title: "Please, enter valid title"}));
            return;
        } else setErrors(prevErrors => ({...prevErrors, title: ""}));

        if(thumbnailUrl) fd.append("thumbnail_url", thumbnailUrl);
        else fd.append("thumbnail_url", "");

        fd.append("content", content);

        const tags = await loadTagsToServer();
        fd.set("tags", tags.map(tag => tag.id));

        for(const [key,value] of fd) console.log(key, value);
    }

    const loadTagsToServer = async() => {
        console.log(tags);
        try {
            const response = await fetch(BASE_URL + API_VER + "/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tags.map(tag => tag.name)),
            });

            if (!response.ok) {
                throw new Error("Ошибка при сохранении тегов");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && tagInput.current) {
            event.preventDefault();
            const value = tagInput.current.value;
            if (isTag(value) && tags.every(tag => tag.name.toLowerCase() !== value.toLowerCase())){
                setTags(prevTags => [...prevTags, { name: value }]);
                setErrors(prevErrors => ({...prevErrors, tags: ""}));
                tagInput.current.value = "";
            }else{
                setErrors(prevErrors => ({...prevErrors, tags: "Please, enter valid tag"}));
            }
        }
    }

    const handleDeleteTag = (tagToDelete: string) =>
        setTags(prevTags => prevTags.filter(tag => tag.name !== tagToDelete));

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <form className="w-3/4 flex flex-col gap-4 mt-12" onSubmit={(event) => handleSubmit(event)}>
               <div className="flex gap-4">
                   <ThumbnailLoader
                        url={thumbnailUrl}
                        setUrl={setThumbnailUrl}
                   />
                   <section className="w-full p-4 flex flex-col gap-4">
                       <p className="flex flex-row border-b-1 pb-2">
                           <label htmlFor="Title" className="my-auto">Title: </label>
                           <input
                               name="title" placeholder="Enter title..."
                               className={"h-12 p-4 ml-4 flex-grow rounded-3xl" + (errors.title ? " bg-red-300" : "")}
                               onFocus={() => setErrors(prevErrors => ({...prevErrors, title: ""}))}
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
                        <label htmlFor="category" className="my-auto">Category: </label>
                        <select name="category" className="ml-2 p-2 w-44 rounded-2xl border-gray-200 border-1">
                            {categories.map(category => {
                                return <option key={category.slug} value={category.slug}>{category.name}</option>
                            })}
                        </select>
                    </p>
                    <p className="flex flex-row p-4 w-full">
                        <label htmlFor="tags" className="my-auto">Tags: </label>
                        <input name="tags"
                               placeholder="Append tag"
                               ref={tagInput}
                               onKeyDown={(event) => handleAddTag(event)}
                               className={"h-12 p-4 ml-4 rounded-3xl" + (errors.tags ? " bg-red-200" : "")}
                        />
                    </p>
                </section>
                <section className="overflow-x-auto flex flex-row gap-1">
                    {tags.map(tag => {
                        return <TagBubble key={tag.name} name={tag.name} onDelete={() => handleDeleteTag(tag.name)}/>
                    })}
                </section>
                <QuillEditor
                    value={content}
                    onChange={setContent}
                />
            </form>
        </div>
    );
}


export default NewPost;