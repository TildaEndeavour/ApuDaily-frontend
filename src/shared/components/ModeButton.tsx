import { useNavigate } from "react-router-dom";
import {Pencil, Search} from "lucide-react";

const ModeButton = () => {

    const navigate = useNavigate();

    return(
        <div className="h-20 w-72 rounded-4xl shadow-xl/60 flex items-center justify-between p-4
                        animate-fade-up animate-once animate-duration-3000 animate-delay-500 animate-ease-in-out animate-alternate animate-fill-both">
            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={() => navigate("/posts/new")}>
                <Pencil size={48}/>
            </button>

            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={() => navigate("/posts")}>
                <Search size={48}/>
            </button>
        </div>
    );
}

export default ModeButton;