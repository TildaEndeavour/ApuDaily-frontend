import {useLoaderData} from "react-router-dom";

const Posts = () => {

    const posts = useLoaderData();

    console.log(posts);

    return (
        <div className="w-3/4 h-screen flex flex-wrap justify-center gap-12 pt-12">

        </div>
    );
}

export default Posts;

export async function loader() {
    const response = await fetch("http://localhost:3000/api/v1/posts");
    if (!response.ok) {
        return { isError: true, message: 'Could not fetch events.' };
    } else {
        return response;
    }
}