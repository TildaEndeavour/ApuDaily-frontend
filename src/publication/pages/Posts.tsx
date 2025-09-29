import {useLoaderData, useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";
import {use, useEffect, useRef, useState} from "react";
import type {Post} from "../model/Post.ts";
import axios from "axios";
import SearchBar from "../../shared/components/SearchBar.tsx";

const Posts = () => {

    const [posts, setPosts] = useState<Post[]>(useLoaderData().body.content);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [hasMore, setHasMore] = useState(!useLoaderData().last);
    const navigate = useNavigate();

    const loadingRef = useRef(null);

    const loadMore = async () => {
        setIsLoading(true);
        const nextPage = page + 1;
        const response = await axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/posts?pageNumber=' + nextPage);
        if(response.status === 200){
            const newPosts = await response.data;
            setHasMore(!newPosts.last);
            setPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts.content]);
            setPage(nextPage);
        }
        setIsLoading(false);
    }

    const handleSelectPost = (postId: number) => {
        navigate(`/posts/${postId}`);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore()
                }
            },
            { threshold: 1.0}
        );

        if (loadingRef.current) { observer.observe(loadingRef.current);}

        return () => observer.disconnect();
    });

    return (
        <div className="flex flex-col items-center pt-16">
            <SearchBar onChangeLayout={setIsGridLayout}/>
            <div className={"mt-8 flex justify-center animate-fade-down" + (isGridLayout ? " w-10/12" : " w-8/12")}>
                {posts.length > 0 ?
                    <div className={"flex flex-wrap justify-start pb-12 w-full" + (isGridLayout ? " gap-12" : " gap-4")}>
                        {posts.map((post: Post) => {
                            return <PostCard onSelect={() => handleSelectPost(post.id!)} key={post.id} post={post} isGridLayout={isGridLayout}/>
                        })}
                    </div> :
                    <h1>
                        There is no content
                    </h1>
                }
            </div>
            {hasMore && (
                <div ref={loadingRef}>
                    {isLoading && <p>Loading...</p>}
                </div>
            )}
        </div>
    );
}

export default Posts;