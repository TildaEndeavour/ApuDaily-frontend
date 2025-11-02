import {MessageCircle} from "lucide-react";

const CommentariesCounter: React.FC<{commentariesNum: number}> = ({commentariesNum}) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {commentariesNum}
            <MessageCircle size={24} strokeWidth={1}/>
        </div>
    );
}

export default CommentariesCounter;