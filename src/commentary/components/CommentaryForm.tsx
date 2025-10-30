import React, {useState} from "react";
import type {CommentaryFormProps} from "../model/CommentaryFormProps.ts";

const CommentaryForm: React.FC<CommentaryFormProps> = ({postId, commentId, content, parentCommentId, onSubmit}) => {
    const [commentary, setCommentary] = useState(content ? content : "");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({postId, commentId, parentCommentId, content: commentary});
        setCommentary("");
    }

    return (
        <form
            className="w-full h-fit p-4 shadow-2xl rounded-3xl animate-fade-down"
            onSubmit={(e) => handleSubmit(e)}
        >
            <textarea
                className="w-full h-fit max-h-30 p-4 border-b-1"
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
            />
            <section className="flex flex-row justify-end">
                <button className="p-2 rounded-3xl border-1">Send commentary</button>
            </section>
        </form>
    );
}

export default CommentaryForm;