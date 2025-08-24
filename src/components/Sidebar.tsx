import {useState} from "react";
import {Bookmark, Menu} from "lucide-react";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    return (
        <aside className={"fixed group h-screen items-center flex flex-col bg-white shadow-xl/60 transition-all duration-300 pt-8" + (isCollapsed ? " w-64" : " w-20 hover:w-64")}>
            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={handleCollapse}>
                <Menu strokeWidth={1} size={48}/>
            </button>
            <p className={"mt-10 mb-10" + (isCollapsed ? " " : " hidden group-hover:inline")}>/HomePage</p>
            <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}>
                <Bookmark strokeWidth={1} size={48}/>
            </button>
        </aside>
    );
}

export default Sidebar;