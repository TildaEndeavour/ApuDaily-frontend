import {useState} from "react";
import {House, Menu, Pencil, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    return (
        <aside className={"fixed group h-screen items-center flex flex-col bg-white shadow-xl/60 transition-all duration-500 pt-8" + (isCollapsed ? " w-64" : " w-20 hover:w-64")}>
            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={handleCollapse}>
                <Menu strokeWidth={1} size={48}/>
            </button>
            <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                    onClick={() => navigate('/')}>
                <House strokeWidth={1} size={48}/>
            </button>
            <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                    onClick={() => navigate('/posts')}>
                <Search strokeWidth={1} size={48}/>
            </button>
            <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                    onClick={() => navigate('/posts/new')}>
                <Pencil strokeWidth={1} size={48}/>
            </button>
        </aside>
    );
}

export default Sidebar;