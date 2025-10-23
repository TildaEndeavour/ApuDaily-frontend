import React, {useState} from "react";
import type {Commentary} from "../model/Commentary.ts";
import CommentaryForm from "./CommentaryForm.tsx";
import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import {uploadCommentary} from "../services/requests.ts";

const CommentaryBubble: React.FC<{commentary: Commentary}> = ({commentary}) => {

    const [isReplying, setIsReplying] = useState(false);
    const [isShowReplies, setIsShowReplies] = useState(false);

    const submitReply = async (reply: CommentaryCreateRequestDto) => {
        await uploadCommentary(reply);
    }

    return (
        <div className="flex flex-col">
            <section>
                {commentary.user.username} at {commentary.createdAt.toString()}
            </section>
            <section>
                {commentary.content}
            </section>
            <section className="flex flex-row gap-4">
                <button onClick={() => setIsShowReplies((prevState) => !prevState)}>replies</button>
                <button onClick={() => setIsReplying((prevState) => !prevState)}>reply</button>
            </section>
            {isReplying && <CommentaryForm postId={commentary.postId} parentCommentId={commentary.id} onSubmit={submitReply}/>}
            {isShowReplies && commentary.replies?.map(reply => <section>
                {reply.user.username} say {reply.content}
            </section>)}
        </div>
    );
}

export default CommentaryBubble;