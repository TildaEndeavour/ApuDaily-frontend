import type {ReactionSetRequestDto} from "../model/dto/ReactionSetRequestDto.ts";
import axios from "axios";
import type {ReactionGetRequestDto} from "../model/dto/ReactionGetRequestDto.ts";

export const setReaction = async (requestDto: ReactionSetRequestDto) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/reactions`,
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

export const getReactionFromTarget = async (requestDto: ReactionGetRequestDto) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/reactions`,
            {
                params: requestDto
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