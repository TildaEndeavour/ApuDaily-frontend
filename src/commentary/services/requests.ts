import type {CommentaryCreateRequestDto} from "../model/dto/CommentaryCreateRequestDto.ts";
import axios from "axios";

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