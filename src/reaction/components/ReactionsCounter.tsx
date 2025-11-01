import {ArrowDown, ArrowUp} from "lucide-react";

export const ReactionsCounter = () => {
    return (
        <div className="w-full flex flex-row justify-between border-1 rounded-3xl">
            <button className="flex flex-row items-center p-1 w-1/2 border-r-1">
                <ArrowUp size={24} strokeWidth={1}/>
                0
            </button>
            <button className="flex flex-row items-center p-1">
                <ArrowDown size={24} strokeWidth={1}/>
                0
            </button>
        </div>
    );
}