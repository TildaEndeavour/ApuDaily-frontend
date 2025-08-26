import {ImageOff} from "lucide-react";

const PostCard = () => {
    return (
        <div className="w-104 h-120 border rounded-4xl shadow-2xl">
            <section className="w-full h-6/12 border-b rounded-t-4xl flex flex-row justify-center items-center">
                <ImageOff size={144} color="gray" strokeWidth={1}/>
            </section>
            <section className="p-4 flex flex-col gap-4">
                <p className="text-xl font-semibold">Title</p>
                <p>Description</p>
            </section>
        </div>
    );
}

export default PostCard;