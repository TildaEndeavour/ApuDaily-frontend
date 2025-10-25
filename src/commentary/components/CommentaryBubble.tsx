import React, {useState} from "react";
import CommentaryForm from "./CommentaryForm.tsx";
import {ChevronDown, ChevronUp, MessageCircleReply, PencilLine, Trash2} from "lucide-react";
import {useAuth} from "../../auth/providers/AuthProvider.tsx";
import type {CommentaryBubbleProps} from "../model/CommentaryBubbleProps.ts";
import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";

const CommentaryBubble: React.FC<CommentaryBubbleProps> = ({commentary, onSubmitReply, onDeleteCommentary}) => {

    const {user} = useAuth();
    const [isReplying, setIsReplying] = useState(false);
    const [isShowReplies, setIsShowReplies] = useState(false);

    const submitReply = async (reply: CommentaryCreateRequestDto) => {
       onSubmitReply(reply);
       setIsReplying(false);
    }

    return (
        <div className="flex flex-col w-full gap-2 shadow-2xl p-4 border-l-1 rounded-r-3xl overflow-x-auto animate-fade-down">
            <div>
                <section className="px-4 flex flex-row gap-2">
                    {commentary.user.username} at {commentary.createdAt.toString()}
                    <button className="flex flex-row gap-2"
                        onClick={() => setIsReplying((prevState) => !prevState)}
                    >
                        <MessageCircleReply size={24} strokeWidth={1}/>Reply
                    </button>
                    {(user?.id === commentary.user.id) &&
                        <section className="flex flex-row gap-2">
                            <button className="flex flex-row gap-2"><PencilLine size={24} strokeWidth={1}/>Edit</button>
                            <button
                                className="flex flex-row gap-2"
                                onClick={() => onDeleteCommentary(commentary)}
                            >
                                <Trash2 size={24} strokeWidth={1}/>Delete
                            </button>
                        </section>}
                </section>
                <section className="py-6 px-4">
                    {commentary.content}
                </section>
                {isReplying && <CommentaryForm postId={commentary.postId} parentCommentId={commentary.id} onSubmit={submitReply}/>}
                <button className="flex flex-row gap-2"
                        onClick={() => setIsShowReplies((prevState) => !prevState)}>
                    {isShowReplies ? <ChevronUp size={24} strokeWidth={1}/> : <ChevronDown size={24} strokeWidth={1}/>} Replies ({commentary.replies?.length})
                </button>
                {isShowReplies && commentary.replies?.map(reply =>
                    <section className="flex flex-row mt-8">
                        <div className="w-6"/>
                        <CommentaryBubble key={reply.id} commentary={reply} onSubmitReply={onSubmitReply} onDeleteCommentary={onDeleteCommentary}/>
                    </section>)}
            </div>
        </div>
    );
}

export default CommentaryBubble;