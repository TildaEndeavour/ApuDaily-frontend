import type Tag from "../model/Tag.ts";
import axios from "axios";
import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";

export const uploadTagsToServer = async (tags: Tag[]) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/tags`,
            tags.map(tag => tag.name.toLowerCase()),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        throw new Error("Tags upload error");
    }
};

export const uploadPost = async(post: PostCreateRequestDto) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/posts`,
            post,
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
        throw new Error("Post upload error");
    }
}