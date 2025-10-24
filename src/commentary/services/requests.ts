import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import axios from "axios";
import type {CommentaryDeleteRequestDto} from "../model/dto/CommentaryDeleteRequestDto.ts";

export const uploadCommentary = async (requestDto: CommentaryCreateRequestDto) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/commentaries`,
            requestDto,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            status: response.status,
            body: response.data
        };
    } catch (error: unknown) {
        throw new Error("Commentary upload error");
    }
}

export const deleteCommentary = async (requestDto: CommentaryDeleteRequestDto) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/commentaries/${requestDto.commentId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                data: requestDto
            }
        );

        return {
            status: response.status,
            body: response.data
        };
    } catch (error: unknown) {
        throw new Error("Commentary upload error");
    }
}