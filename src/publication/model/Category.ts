class Category {
    id: number;
    name: string;
    slug: string;

    constructor(id: number, name: string, slug: string) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }
}

export async function loader(){
    const response = await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + "/categories");
    return response.json();
}

export default Category;