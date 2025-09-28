import axios from "axios";
import type {LoaderFunctionArgs} from "react-router-dom";

export async function postsLoader() {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/posts');

    return {
        status: response.status,
        body: response.data,
    };
}

export async function postDetailsLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + `/posts/${id}`);

    return {
        status: response.status,
        body: response.data,
    };
}