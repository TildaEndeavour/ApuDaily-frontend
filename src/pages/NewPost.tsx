import {type FormEvent, useState} from "react";
import QuillEditor from "../components/Editor.tsx";
import ThumbnailLoader from "../components/ThumbnailLoader.tsx";
import {Save, Trash} from "lucide-react";

const NewPost = () => {
    const [content, setContent] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

    }
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
            <form className="w-3/4 flex flex-col gap-8 mt-12" onSubmit={(event) => handleSubmit(event)}>
               <div className="flex gap-4">
                   <ThumbnailLoader/>
                   <section className="w-full p-4 flex flex-col gap-4">
                       <p className="flex flex-row border-b-1 pb-2">
                           <label htmlFor="Title" className="my-auto">Title: </label>
                           <input name="title" placeholder="Enter title..." className="h-12 p-4 ml-4 flex-grow"/>
                       </p>
                       <p className="flex flex-col border-b-1">
                           <label htmlFor="description" className="my-auto">Description: </label>
                           <textarea name="description"  placeholder="Enter description" className="h-24 max-h-31 p-4 w-full"/>
                       </p>
                   </section>
                   <p className="flex flex-col gap-4 my-auto">
                       <button className="rounded-3xl border-gray-100 w-48 h-16 hover:bg-green-300 shadow-2xl/30">Publish</button>
                       <p className="flex flex-col items-center gap-2">
                           <button className="rounded-3xl border-gray-100 w-fit h-fit p-4 mt-2 hover:bg-yellow-200 shadow-2xl/30">
                               <Save
                                   size={36}
                               />
                           </button>
                           <button className="rounded-3xl border-gray-100 w-fit h-fit p-4 mt-2 hover:bg-red-300 shadow-2xl/30">
                               <Trash
                                   size={36}
                               />
                           </button>
                       </p>
                   </p>
               </div>
                <section className="flex flex-row w-full border-b-1">
                    <p className="flex flex-row p-4">
                        <label className="my-auto">Category: </label>
                        <select className="ml-2 p-2 w-44 rounded-2xl border-gray-200 border-1">
                            <option value="basicCategory">Basic category</option>
                        </select>
                    </p>
                    <p className="flex flex-row p-4 w-full">
                        <label htmlFor="tags" className="my-auto">Tags: </label>
                        <input name="tags" placeholder="Enter tags..." className="h-12 p-4 ml-4 w-full"/>
                    </p>
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