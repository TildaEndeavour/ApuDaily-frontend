import {useCommentTree} from "../hooks/useCommentTree.ts";
import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import {deleteCommentary, updateCommentary, uploadCommentary} from "../services/requests.ts";
import type {Commentary} from "../model/Commentary.ts";
import CommentaryForm from "./CommentaryForm.tsx";
import React, {useEffect, useRef, useState} from "react";
import CommentaryBubble from "./CommentaryBubble.tsx";
import type {CommentaryUpdateRequestDto} from "../model/dto/CommentaryUpdateRequestDto.ts";
import {loadCommentariesByFilter} from "../services/loaders.ts";
import {useAuth} from "../../auth/providers/AuthProvider.tsx";
import LoadingSpinner from "../../shared/components/LoadingSpinner.tsx";

const CommentarySection: React.FC<{postId: number}> = ({postId}) => {

    const {user} = useAuth();
    const {comments, addComment, deleteComment, updateComment, setComments} = useCommentTree([]);
    const loadingRef = useRef(null);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            const response = await loadCommentariesByFilter({postId: postId,
                commentId: null,
                parentCommentId: null,
                userId: null});
            setComments([])
            response.body.content.map((comment: Commentary) => addComment(comment))
            setHasMore(!response.body.last);
            setIsLoading(false);
        };
        fetchInitial();
    }, []);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const nextPage = page + 1;
        const response = await loadCommentariesByFilter({postId: postId,
            commentId: null,
            parentCommentId: null,
            userId: null},
            10,
            nextPage);
        response.body.content.map((comment: Commentary) => addComment(comment))
        setPage(nextPage);
        setHasMore(!response.body.last);
        setIsLoading(false);
    };

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore()
                }
            },
            { threshold: 1.0}
        );

        if (loadingRef.current) { observer.observe(loadingRef.current);}

        return () => observer.disconnect();
    });

    return (
        <div>
            {user && <CommentaryForm
                postId={postId}
                commentId={null}
                parentCommentId={null}
                content={null}
                onSubmit={handleSubmitCommentary}
            />}
            {(comments.length > 0) && <section className="w-full mt-10 flex flex-col gap-12">
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
                {hasMore && (
                    <div className="flex justify-center" ref={loadingRef}>
                        {isLoading && <LoadingSpinner/>}
                    </div>
                )}
            </section>}
            <div className="mt-20"></div>
        </div>
    );
}

export default CommentarySection;