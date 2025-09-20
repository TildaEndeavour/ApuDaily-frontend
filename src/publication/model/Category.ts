export interface Category {
    id: number;
    name: string;
    slug: string;
}

export async function loader(){
    const response = await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + "/categories");
    return response.json();
}