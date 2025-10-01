import {useLoaderData, useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";
import {useEffect, useRef, useState} from "react";
import type {Post} from "../model/Post.ts";
import PostSearchForm from "../components/post-search-form/PostSearchForm.tsx";
import type {PostFilter} from "../model/PostFilter.ts";
import {searchPosts} from "../services/requests.ts";
import {convertPostFilterToDto} from "../services/converters.ts";

const Posts = () => {

    const [posts, setPosts] = useState<Post[]>(useLoaderData().body.content);
    const [postFilter, setPostFilter] = useState<PostFilter>({
        searchQuery: "",
        users: [],
        tags: [],
        category: []
    });
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(!useLoaderData().body.last);
    const navigate = useNavigate();

    const loadingRef = useRef(null);

    const loadMore = async () => {
        setIsLoading(true);
        const nextPage = page + 1;
        const request = convertPostFilterToDto(postFilter);
        const response = await searchPosts(request, 10, page);
        if(response.status === 200){
            setHasMore(!response.body.last);
            setPosts((prevPosts: Post[]) => [...prevPosts, ...response.body.content]);
            setPage(nextPage);
        }
        setIsLoading(false);
    }

    const applyFilter = async () => {
        const request = convertPostFilterToDto(postFilter);
        const response = await searchPosts(request, 10, 0);
        setPosts(() => response.body.content);
        setPage(0);
        setHasMore(!response.body.last);
    };

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
        <div className="h-screen flex flex-row pt-8">
            <div className="w-8/12 pl-24 flex justify-center animate-fade-down">
                {posts.length > 0 ?
                    <div className="w-full flex flex-col gap-4 overflow-y-auto">
                        {posts.map((post: Post) => {
                            return <PostCard key={post.id} onSelect={() => navigate(`/posts/${post.id!}`)} post={post}/>
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
                <PostSearchForm filter={postFilter} onUpdateFilter={setPostFilter} submitFilter={applyFilter}/>
            </section>
        </div>
    );
}

export default Posts;