import {ImageUp} from "lucide-react";
import {useState} from "react";

const ThumbnailLoader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState(null);

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

        input.onchange = async () => {
            const file = input.files?.[0];
            if(!file) return;

            const response = await uploadFile(file);

            const data = await response.json();
            setThumbnailUrl(data.path);
        }
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files

        if(files.length == 0) return;

        const response = await uploadFile(files[0]);
        const data = await response.json();
        setThumbnailUrl(data.path);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const thumbnailPlaceholder = (
    <div onDrop={handleDrop}
         onDragOver={handleDragOver}
         className="mt-12 flex flex-col items-center"
    >
        <ImageUp size={48}/>
        <p className="font-bold mt-4">Drop thumbnail here</p>
        <p className="italic my-1">or</p>
        <button
            className="p-4 w-fit  border-gray-200 border-1 rounded-3xl hover:bg-gray-200"
            onClick={loadHandler}>
            BROWSE IMAGE
        </button>
    </div>
    );

    return (
        <div className="border-dashed border-3 rounded-3xl border-gray-200 hover:border-gray-400 w-112 h-64 shadow-2xl">
            {!thumbnailUrl ? thumbnailPlaceholder :
                <img className="rounded-3xl w-full h-full object-contain"
                     alt="Thumbnail"
                     src={import.meta.env.VITE_BASE_URL + thumbnailUrl}
                />
            }
        </div>
    );
}

export default ThumbnailLoader;