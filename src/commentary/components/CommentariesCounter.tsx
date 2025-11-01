import {MessageCircle} from "lucide-react";

const CommentariesCounter = () => {
    return (
        <div className="flex flex-row gap-2 items-center">
            0
            <MessageCircle size={24} strokeWidth={1}/>
        </div>
    );
}

export default CommentariesCounter;