import {useState} from "react";
import {House, Menu, Pencil, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import UserBadge from "../../auth/components/UserBadge.tsx";
import ModalCard from "./ModalCard.tsx";
import LoginForm from "../../auth/components/LoginForm.tsx";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoginCardOpen, setIsLoginCardOpen] = useState(false);
    const navigate = useNavigate();

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    return (
        <aside className={"fixed group h-screen items-center flex flex-col bg-white shadow-xl/60 transition-all duration-500 pt-8 justify-between" + (isCollapsed ? " w-64" : " w-20 hover:w-64")}>
            <section className="flex flex-col">
                <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={handleCollapse}>
                    <Menu strokeWidth={1} size={48}/>
                </button>
                <button className={"p-4 mt-40 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                        onClick={() => navigate('/')}>
                    <House strokeWidth={1} size={36}/>
                </button>
                <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                        onClick={() => navigate('/posts')}>
                    <Search strokeWidth={1} size={36}/>
                </button>
                <button className={"p-4 w-fit h-fit rounded-full hover:bg-stone-100" + (isCollapsed ? " " : " hidden group-hover:inline")}
                        onClick={() => navigate('/posts/new')}>
                    <Pencil strokeWidth={1} size={36}/>
                </button>
            </section>
            <UserBadge onLogin={() => (setIsLoginCardOpen(true))}/>
            <ModalCard isOpen={isLoginCardOpen} onClose={() => setIsLoginCardOpen(false)}>
                <LoginForm/>
            </ModalCard>
        </aside>
    );
}

export default Sidebar;