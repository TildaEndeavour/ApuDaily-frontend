import axios from "axios";

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export async function loader(){
    const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/categories');
    return {
        status: response.status,
        body: response.data,
    };
}