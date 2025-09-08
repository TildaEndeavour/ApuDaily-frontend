import {CircleX} from "lucide-react";

export const TagBubble: React.FC<{name: string, onDelete: (name: string) => void}> = ({name, onDelete}) => {
    return(
        <div className="p-2 w-fit h-fit flex flex-row gap-2 border-1 rounded-3xl justify-center items-center">
            <p className="text-xs">{name}</p>
            <CircleX color="red" size={18} onClick={() => onDelete(name)}/>
        </div>
    );
}