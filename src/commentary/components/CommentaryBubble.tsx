import React, {useState} from "react";
import type {Commentary} from "../model/Commentary.ts";
import CommentaryForm from "./CommentaryForm.tsx";
import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import {uploadCommentary} from "../services/requests.ts";
import {MessageCircleReply} from "lucide-react";

const CommentaryBubble: React.FC<{commentary: Commentary}> = ({commentary}) => {

    const [isReplying, setIsReplying] = useState(false);
    const [isShowReplies, setIsShowReplies] = useState(false);
    const [replies, setReplies] = useState<Commentary[]>(commentary.replies ? commentary.replies : []);

    const submitReply = async (reply: CommentaryCreateRequestDto) => {
       const response = await uploadCommentary(reply);
       setReplies((prevReplies) => [...prevReplies, response.body]);
       setIsReplying(false);
    }

    return (
        <div className="flex flex-col w-full gap-2 shadow-2xl p-4 border-l-1 rounded-r-3xl overflow-x-auto animate-fade-down">
            <div>
                <section className="px-4 flex flex-row gap-4">
                    {commentary.user.username} at {commentary.createdAt.toString()}
                    <button className="flex flex-row gap-2"
                            onClick={() => setIsShowReplies((prevState) => !prevState)}>
                        <MessageCircleReply size={24} strokeWidth={1}/> {isShowReplies ? "Hide" : "Show" } replies ({commentary.replies?.length})
                    </button>
                    <button onClick={() => setIsReplying((prevState) => !prevState)}>Reply</button>
                </section>
                <section className="py-6 px-4">
                    {commentary.content}
                </section>
                {isReplying && <CommentaryForm postId={commentary.postId} parentCommentId={commentary.id} onSubmit={submitReply}/>}
                {isShowReplies && replies?.map(reply =>
                    <section className="flex flex-row mt-8">
                        <div className="w-6"/>
                        <CommentaryBubble key={reply.id} commentary={reply}/>
                    </section>)}
            </div>
        </div>
    );
}

export default CommentaryBubble;