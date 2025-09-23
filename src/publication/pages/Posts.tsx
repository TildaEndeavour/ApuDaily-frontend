import {useLoaderData, useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";
import {useEffect, useRef, useState} from "react";
import type {Post} from "../model/Post.ts";
import axios from "axios";

const Posts = () => {

    const [posts, setPosts] = useState<Post[]>(useLoaderData().body.content);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
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
        <div className="w-3/4 h-screen">
            <div className="flex flex-wrap justify-start gap-12 pt-12 pb-12">
                {posts.map((post: Post) => {
                    return <PostCard onSelect={() => handleSelectPost(post.id)} key={post.id} post={post}/>
                })}
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