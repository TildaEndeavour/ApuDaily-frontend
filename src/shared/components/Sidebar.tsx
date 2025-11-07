import {useEffect, useRef, useState} from "react";
import {House, Menu, Pencil, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import UserBadge from "../../auth/components/UserBadge.tsx";
import AuthModal from "../../auth/components/AuthModal.tsx";
import {useAuth} from "../../auth/hooks/useAuth.ts";

const Sidebar = () => {
    const {user, removeTokens} = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoginCardOpen, setIsLoginCardOpen] = useState(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <aside ref={ref} className={"fixed z-50 group h-screen items-center flex flex-col bg-white shadow-xl/60 transition-all duration-500 pt-8 justify-between" + (isCollapsed ? " w-64" : " w-20 hover:w-64")}>
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
                onLogOut={removeTokens}
                data={user}
                isCollapsed={width < 200}
            />
            {isLoginCardOpen && <AuthModal onClose={() => setIsLoginCardOpen(false)} />}
        </aside>
    );
}

export default Sidebar;