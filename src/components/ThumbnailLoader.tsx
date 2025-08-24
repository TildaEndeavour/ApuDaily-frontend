import {ImageUp} from "lucide-react";

const ThumbnailLoader = () => {
    return (
        <div className="border-dashed border-3 rounded-3xl border-gray-200 w-112 h-64 p-12 shadow-2xl flex flex-col items-center">
            <ImageUp size={48}/>
            <p className="font-bold mt-4">Drop thumbnail here</p>
            <p className="italic my-1">or</p>
            <button className="p-4 w-fit  border-gray-200 border-1 rounded-3xl hover:bg-gray-200">
                BROWSE IMAGE
            </button>
        </div>
    );
}

export default ThumbnailLoader;