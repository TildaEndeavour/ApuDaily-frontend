import axios from "axios";
import type {LoaderFunctionArgs} from "react-router-dom";
import type {PostSearchRequestDto} from "../model/dto/PostSearchRequestDto.ts";
import {loadCommentariesByFilter} from "../../commentary/services/loaders.ts";

export const postLoader = async () => {
    try {
        const pageSize = 10;
        const pageNumber = 0;
        const initRequest: PostSearchRequestDto = {
            searchQuery: "",
            usersId: [],
            tagsId: [],
            categoryId: null
        }
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/posts/search`,
            initRequest,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    pageSize,
                    pageNumber,
                }
            }
        );

        return {
            status: response.status,
            body: response.data
        };
    } catch (error: unknown) {
        throw new Error("Post search error");
    }
};

export async function postDetailsLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    const postResponse = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + `/posts/${id}`);
    const post = postResponse.data;
    const commentariesResponse = await loadCommentariesByFilter({postId: Number(id), userId: null, commentId: null, parentCommentId: null});
    const commentaries = commentariesResponse.body.content;
    return {
        post: post,
        commentaries: commentaries
    };
}