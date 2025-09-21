import axios from "axios";

export async function postLoader() {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/posts');

    return {
        status: response.status,
        body: response.data,
    };
}