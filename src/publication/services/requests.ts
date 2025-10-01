import type Tag from "../model/Tag.ts";
import axios from "axios";
import type {PostCreateRequestDto} from "../model/dto/PostCreateRequestDto.ts";
import type {PostUpdateRequestDto} from "../model/dto/PostUpdateRequestDto.ts";
import type {PostDeleteRequestDto} from "../model/dto/PostDeleteRequestDto.ts";

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

export const loadAllTagsFromServer = async() => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/tags');
    return {
        status: response.status,
        body: response.data,
    };
}

export const loadAllUserProfiles = async() => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/profiles');
    return {
        status: response.status,
        body: response.data,
    };
}

export const uploadPost = async(requestDto: PostCreateRequestDto) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/posts`,
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
        throw new Error("Post upload error");
    }
}

export const updatePost= async(requestDto: PostUpdateRequestDto) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/posts/${requestDto.postId}`,
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
        throw new Error("Post upload error");
    }
}

export const deletePost = async (requestDto: PostDeleteRequestDto) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_VER}/posts/${requestDto.postId}`,
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
        throw new Error("Post deletion error");
    }
};