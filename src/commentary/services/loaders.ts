import type {CommentSearchRequestDto} from "../model/dto/CommentSearchRequestDto.ts";
import axios from "axios";

export const loadCommentariesByFilter = async (
    searchRequest: CommentSearchRequestDto,
    pageSize: number = 10,
    pageNumber: number = 0
) => {
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/commentaries/search`,
            searchRequest,
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
}

