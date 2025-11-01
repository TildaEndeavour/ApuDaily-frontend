import {ArrowDown, ArrowUp} from "lucide-react";

const ReactionsCounter = () => {
    return (
        <div className="w-full flex flex-row justify-between border-1 rounded-3xl">
            <button className="flex flex-row items-center justify-center p-1 w-1/2 border-r-1">
                <ArrowUp size={24} strokeWidth={1}/>
                0
            </button>
            <button className="flex flex-row justify-center items-center w-1/2 p-1">
                <ArrowDown size={24} strokeWidth={1}/>
                0
            </button>
        </div>
    );
}

export default ReactionsCounter;