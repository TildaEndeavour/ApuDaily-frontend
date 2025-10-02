import axios from "axios";
import type {LoaderFunctionArgs} from "react-router-dom";
import type {PostSearchRequestDto} from "../model/dto/PostSearchRequestDto.ts";

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
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + `/posts/${id}`);

    return {
        status: response.status,
        body: response.data,
    };
}