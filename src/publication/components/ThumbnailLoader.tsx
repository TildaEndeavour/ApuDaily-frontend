import {ImageUp, Loader, RefreshCcw} from "lucide-react";
import React, {useState} from "react";
import type Thumbnail from "../model/Thumbnail.ts";

const ThumbnailLoader: React.FC<{thumbnail: Thumbnail | null, setThumbnail: (thumbnail:Thumbnail) => void}> = ({thumbnail, setThumbnail}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file: File) => {

        const formData = new FormData();
        formData.append("file",file);

        return await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/upload',
            {
                method: "POST",
                body: formData
            }
        );
    }

    const loadHandler = () => {

        const input = document.createElement("input");
        input.setAttribute("type","file");
        input.setAttribute("accept","image/*");
        input.click();

        setIsLoading(true);
        input.onchange = async () => {
            const file = input.files?.[0];
            if(!file) return;

            const response = await uploadFile(file);
            const data = await response.json();

            if(!response.ok){
                setError(data.error);
                return;
            }

            setThumbnail(data);
            setError(null);
        }
        setIsLoading(false);
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        setIsLoading(true);
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files

        if(files.length == 0) return;

        const response = await uploadFile(files[0]);
        const data = await response.json();
        setIsLoading(false);

        if(!response.ok){
            setError(data.error);
            return;
        }

        setThumbnail(data);
        setError(null);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const thumbnailPlaceholder = (
        <div onDrop={handleDrop}
             onDragOver={handleDragOver}
             className={"flex flex-col items-center justify-center rounded-3xl h-full " + (error ? "bg-red-100" : "")}
        >
            <ImageUp size={48}/>
            <p className="font-bold mt-4">{error ? "Wrong file type, try again" : "Drop thumbnail here"}</p>
            <p className="italic my-1">{error ? " " : "or"}</p>
            <button
                type="button"
                className="p-4 w-fit  border-black border-1 rounded-3xl hover:bg-gray-200"
                onClick={loadHandler}>
                BROWSE IMAGE
            </button>
        </div>
    );

    return (
        <div className="relative z-10 border-dashed border-3 rounded-3xl border-gray-200 hover:border-gray-400 w-112 h-64 shadow-2xl">
            {!thumbnail ? thumbnailPlaceholder :
                (<>
                    <img className="rounded-3xl w-full h-full object-contain"
                         alt="Thumbnail"
                         src={import.meta.env.VITE_BASE_URL + thumbnail.url}
                    />
                    <p className="absolute inset-0 hover:animate-spin flex items-center justify-center"
                       onClick={loadHandler}
                    >
                        <RefreshCcw className="scale-x-[-1]" strokeWidth={1} size={48}/>
                    </p>
                </>
                )
            }
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-3xl">
                    <Loader className="animate-spin w-12 h-12 text-gray-400" />
                </div>
            )}
        </div>
    );
}

export default ThumbnailLoader;