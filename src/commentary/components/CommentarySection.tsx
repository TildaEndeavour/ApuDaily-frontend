import {useCommentTree} from "../hooks/useCommentTree.ts";
import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import {deleteCommentary, updateCommentary, uploadCommentary} from "../services/requests.ts";
import type {Commentary} from "../model/Commentary.ts";
import CommentaryForm from "./CommentaryForm.tsx";
import React from "react";
import CommentaryBubble from "./CommentaryBubble.tsx";
import type {CommentaryUpdateRequestDto} from "../model/dto/CommentaryUpdateRequestDto.ts";

const CommentarySection: React.FC<{postId: number, commentaries: Commentary[]}> = ({postId, commentaries}) => {

    const {comments, addComment, deleteComment, updateComment} = useCommentTree(commentaries);

    const handleSubmitCommentary = async (request: CommentaryCreateRequestDto) => {
        const response = await uploadCommentary({
            postId: request.postId,
            parentCommentId: request.parentCommentId,
            content: request.content});
        addComment(response.body);
    }

    const handleUpdateCommentary = async (request: CommentaryUpdateRequestDto) => {
        const response = await updateCommentary(request);
        updateComment(response.body);
    }

    const handleDeleteCommentary = async (comment: Commentary) => {
        await deleteCommentary({commentId: comment.id});
        deleteComment(comment.id);
    }

    return (
        <div>
            <CommentaryForm
                postId={postId}
                commentId={null}
                parentCommentId={null}
                content={null}
                onSubmit={handleSubmitCommentary}
            />
            <section className="w-full mt-10 flex flex-col gap-12">
                {comments.map(commentary =>
                    <section key={commentary.id}>
                        <CommentaryBubble
                            key={commentary.id}
                            commentary={commentary}
                            onSubmitReply={handleSubmitCommentary}
                            onUpdateCommentary={handleUpdateCommentary}
                            onDeleteCommentary={handleDeleteCommentary}
                        />
                    </section>)}
            </section>
            <div className="mt-20"> </div>
        </div>
    );
}

export default CommentarySection;