import {ArrowDown, ArrowUp} from "lucide-react";
import type {Reaction} from "../model/Reaction.ts";

const ReactionsCounter: React.FC<{
    prevReaction: Reaction | undefined,
    upvotes: number,
    onUpvote: () => void,
    downvotes: number,
    onDownvote: () => void}> = ({prevReaction, upvotes, onUpvote, downvotes, onDownvote}) => {

    const hasReaction = prevReaction !== undefined && prevReaction !== null;

    return (
        <div className="w-full flex flex-row justify-between border-1 rounded-3xl">
            <button
                className={`flex flex-row items-center justify-center p-1 w-1/2 border-r-1 rounded-l-3xl hover:bg-green-200 ${
                   hasReaction && prevReaction?.isUpvote ? 'bg-green-200' : ''
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onUpvote();
                }}
            >
                <ArrowUp size={24} strokeWidth={1}/>
                {upvotes}
            </button>
            <button
                className={`flex flex-row justify-center items-center rounded-r-3xl w-1/2 p-1 hover:bg-red-200 ${
                    hasReaction && !prevReaction?.isUpvote ? 'bg-red-200' : ''
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onDownvote();
                }}
            >
                <ArrowDown size={24} strokeWidth={1}/>
                {downvotes}
            </button>
        </div>
    );
}

export default ReactionsCounter;