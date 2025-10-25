import type { Commentary } from "../model/Commentary";
import {useCallback, useState} from "react";

export const useCommentTree = (initialComments: Commentary[] = []) => {
    const [comments, setComments] = useState<Commentary[]>(initialComments);

    const addComment = useCallback((newComment: Commentary) => {
        setComments(prev =>
            newComment.parentCommentId
                ? addReplyToTree(prev, newComment)
                : [...prev, newComment]
        );
    }, []);

    const updateComment = useCallback((updated: Commentary) => {
        const updateRecursively = (nodes: Commentary[]): Commentary[] =>
            nodes.map(node => {
                if (node.id === updated.id) {
                    return { ...node, ...updated };
                }
                if (node.replies) {
                    return { ...node, replies: updateRecursively(node.replies) };
                }
                return node;
            });

        setComments(prev => updateRecursively(prev));
    }, []);

    const deleteComment = useCallback((id: number) => {
        const removeRecursively = (nodes: Commentary[]): Commentary[] =>
            nodes
                .filter(node => node.id !== id)
                .map(node => ({
                    ...node,
                    replies: node.replies ? removeRecursively(node.replies) : null
                }));

        setComments(prev => removeRecursively(prev));
    }, []);

    return { comments, addComment, updateComment, deleteComment, setComments };
};

const addReplyToTree = (
    nodes: Commentary[],
    newReply: Commentary
): Commentary[] => {
    return nodes.map(node => {
        if (node.id === newReply.parentCommentId) {
            return {
                ...node,
                replies: [...(node.replies ?? []), newReply]
            };
        }

        if (node.replies) {
            return { ...node, replies: addReplyToTree(node.replies, newReply) };
        }

        return node;
    });
};