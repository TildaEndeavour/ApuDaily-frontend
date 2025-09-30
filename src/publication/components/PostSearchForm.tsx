import SearchBar from "../../shared/components/SearchBar.tsx";
import type Tag from "../model/Tag.ts";
import {useRef, useState} from "react";
import {isTag} from "../services/validation.ts";
import {TagBubble} from "./TagBubble.tsx";
import {CircleDot, Milestone, Settings, Tags, UserSearch} from "lucide-react";

const PostSearchForm = () => {

    const tagRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<Tag[]>([]);

    const addTag = (name: string) => {
        if (isTag(name) && tags.every(tag => tag.name.toLowerCase() !== name.toLowerCase())) {
            const newTag: Tag = { id: null, name };
            setTags(prevTags => [...prevTags, newTag]);
        }
    };

    const removeTag = (name: string) => {
        setTags(tags.filter(tag => tag.name !== name) ?? []);
    };

    return (
        <div>
            <SearchBar/>
            <section className="mt-6 pt-3 px-6 pb-6 flex flex-col border-t-1 border-b-1">
                <section className="flex flex-row justify-between">
                    <span className="flex flex-row items-center mb-4 gap-4">
                        <UserSearch size={32} strokeWidth={1}/>
                        <p>Authors</p>
                    </span>
                    <Settings size={32} strokeWidth={1}/>
                </section>
                <span className="flex flex-row items-center gap-4">
                    <CircleDot size={24} strokeWidth={1} color="red"/>
                    <p>No authors specified</p>
                </span>
                {tags && tags.map(tag => {
                    return <TagBubble key={tag.name} name={tag.name} onDelete={() => removeTag(tag.name)}/>
                })}
            </section>
            <section className="pt-3 px-6 pb-6 flex flex-col border-b-1">
                <section className="flex flex-row justify-between">
                    <span className="flex flex-row items-center mb-4 gap-4">
                        <Tags size={32} strokeWidth={1}/>
                        <p>Tags</p>
                    </span>
                    <Settings size={32} strokeWidth={1}/>
                </section>
                <span className="flex flex-row items-center gap-4">
                    <CircleDot size={24} strokeWidth={1} color="red"/>
                    <p>No tags specified</p>
                </span>
                {tags && tags.map(tag => {
                    return <TagBubble key={tag.name} name={tag.name} onDelete={() => removeTag(tag.name)}/>
                })}
            </section>
            <section className="mb-6 pt-3 px-6 pb-6 flex flex-col border-b-1">
                <section className="flex flex-row justify-between">
                    <span className="flex flex-row items-center mb-4 gap-4">
                        <Milestone size={32} strokeWidth={1}/>
                        <p>Category</p>
                    </span>
                    <Settings size={32} strokeWidth={1}/>
                </section>
                <span className="flex flex-row items-center gap-4">
                    <CircleDot size={24} strokeWidth={1} color="red"/>
                    <p>Category isn't specified</p>
                </span>
                {tags && tags.map(tag => {
                    return <TagBubble key={tag.name} name={tag.name} onDelete={() => removeTag(tag.name)}/>
                })}
            </section>
            <section className="flex flex-row items-center justify-between gap-4">
                <button className="w-full p-4 border-1 bg-gray-200 rounded-3xl">Show results</button>
            </section>
        </div>
    );
}

export default PostSearchForm;