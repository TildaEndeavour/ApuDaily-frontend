import {useEffect, useState} from "react";
import {House, Menu, Pencil, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import UserBadge from "../../auth/components/UserBadge.tsx";
import ModalCard from "./ModalCard.tsx";
import LoginForm from "../../auth/components/LoginForm.tsx";
import type User from "../../auth/model/User.ts";
import {getUserDetails} from "../../auth/services/auth.ts";
import {useAuth} from "../../auth/providers/AuthProvider.tsx";

const Sidebar = () => {
    const [user, setUser] = useState<User>();
    const { token } = useAuth();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoginCardOpen, setIsLoginCardOpen] = useState(false);
    const navigate = useNavigate();

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    useEffect(() => {
        if(!token) return;
        (async () => {
            const { body } = await getUserDetails();
            setUser(body);
        })();
    }, [token]);

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
            <UserBadge
                onLogin={() => (setIsLoginCardOpen(true))}
                data={user}
            />
            <ModalCard isOpen={isLoginCardOpen} onClose={() => setIsLoginCardOpen(false)}>
                <LoginForm onClose={() => setIsLoginCardOpen(false)}/>
            </ModalCard>
        </aside>
    );
}

export default Sidebar;