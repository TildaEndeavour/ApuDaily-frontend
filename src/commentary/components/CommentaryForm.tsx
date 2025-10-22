import React, {useState} from "react";
import type {CommentaryFormProps} from "../model/CommentaryFormProps.ts";

const CommentaryForm: React.FC<CommentaryFormProps> = ({postId, parentCommentId, onSubmit}) => {
    const [commentary, setCommentary] = useState("");

    return (
        <form
            className="w-full h-fit p-4 shadow-2xl rounded-3xl"
            onSubmit={(e) => onSubmit(e, {postId: postId, parentCommentId: parentCommentId, content: commentary})}
        >
            <textarea
                className="w-full h-fit max-h-30 p-4 border-b-1"
                onChange={(e) => setCommentary(e.target.value)}
            />
            <section className="flex flex-row justify-end">
                <button className="p-2 rounded-3xl border-1">Send commentary</button>
            </section>
        </form>
    );
}

export default CommentaryForm;