import {ImageOff} from "lucide-react";
import type {Post} from "../model/Post.ts";
import {useEffect, useState} from "react";
import ReactionsCounter from "../../reaction/components/ReactionsCounter.tsx";
import CommentariesCounter from "../../commentary/components/CommentariesCounter.tsx";
import {convertUTCtoUserDate} from "../../shared/services/converters.ts";
import {getReactionFromTarget, setReaction} from "../../reaction/services/request.ts";
import type {ReactionSetRequestDto} from "../../reaction/model/dto/ReactionSetRequestDto.ts";
import {TargetTypes} from "../../shared/model/TargetTypes.ts";
import type {Reaction} from "../../reaction/model/Reaction.ts";

const PostCard: React.FC<{onSelect:() => void; post: Post}> = ({onSelect, post}) => {

    const [prevReaction, setPrevReaction] = useState<Reaction>();

    const fetchReactionFromPost = async () => {
        try {
            const response = await getReactionFromTarget({
                targetTypeId: TargetTypes.POST,
                entityId: post.id!
            });
            setPrevReaction(response.body);
        } catch (error) {
            console.error("Failed to fetch reaction:", error);
        }
    }

    const handleReaction = async (request: ReactionSetRequestDto) => {
        await setReaction(request);
        await fetchReactionFromPost();
    }

    useEffect(() => {
        fetchReactionFromPost();
    }, []);

    return (
        <div className="flex flex-row w-full h-fit animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-alternate animate-fill-both">
            <div onClick={onSelect} className="p-4 w-full h-40 border-1 rounded-3xl shadow-2xl flex flex-row cursor-pointer gap-4">
                <section className="h-full w-3/10 flex flex-row justify-center items-center">
                    {post.thumbnail ? (
                        <img className="rounded-2xl w-full h-full object-cover" src={import.meta.env.VITE_BASE_URL + post.thumbnail.url} alt="thumbnail"/>
                    ) : (
                        <div className="rounded-2xl w-full h-full flex justify-center items-center bg-gray-200">
                            <ImageOff size="100%" color="gray" strokeWidth={1} className="w-full h-full"/>
                        </div>
                    )}
                </section>
                <section className="w-7/10 overflow-x-clip overflow-y-clip">
                    <section className="flex flex-row gap-2 items-center">
                        <p className="text-smtext-gray-800">{post.user ? post.user.username : "Anonym"}</p>
                        <p className="p-2 bg-gray-200 rounded-3xl w-fit h-fit text-xs">{post.category!.name}</p>
                    </section>
                    <section className="gap-4 flex flex-col">
                        <p className="text-lg font-semibold">{post.title}</p>
                        <p>{post.description}</p>
                    </section>
                </section>
                <section className="w-3/10 flex flex-col justify-between">
                    <p className="flex justify-end">
                        {convertUTCtoUserDate(post.createdAt!)}
                    </p>
                    <p className="flex justify-end">
                        <CommentariesCounter commentariesNum={post.commentariesCount}/>
                    </p>
                    <ReactionsCounter
                        prevReaction={prevReaction}
                        upvotes={post.upvotesCount}
                        onUpvote={() => handleReaction({
                            targetTypeId: TargetTypes.POST,
                            entityId: post.id!,
                            isUpvote: true
                        })}
                        downvotes={post.downvotesCount}
                        onDownvote={() => handleReaction({
                            targetTypeId: TargetTypes.POST,
                            entityId: post.id!,
                            isUpvote: false
                        })}
                    />
                </section>
            </div>
        </div>
    )
}

export default PostCard;