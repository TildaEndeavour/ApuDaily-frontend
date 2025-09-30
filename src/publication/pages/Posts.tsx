import {useLoaderData, useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";
import {useEffect, useRef, useState} from "react";
import type {Post} from "../model/Post.ts";
import axios from "axios";
import PostSearchForm from "../components/PostSearchForm.tsx";
import PostPreview from "../components/PostPreview.tsx";

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
        <div className="flex flex-row pt-8 h-screen">
            <div className="w-8/12 pl-24 flex justify-center animate-fade-down">
                {posts.length > 0 ?
                    <div className="flex flex-wrap justify-start pb-12 w-full gap-4 overflow-y-auto">
                        {posts.map((post: Post) => {
                            return <PostCard onSelect={() => handleSelectPost(post.id!)} key={post.id} post={post}/>
                        })}
                        {hasMore && (
                            <div ref={loadingRef}>
                                {isLoading && <p>Loading...</p>}
                            </div>
                        )}
                    </div> :
                    <h1>
                        There is no content
                    </h1>
                }
            </div>
            <section className="w-4/12 px-8 animate-fade-left">
                <PostSearchForm/>
            </section>
        </div>
    );
}

export default Posts;