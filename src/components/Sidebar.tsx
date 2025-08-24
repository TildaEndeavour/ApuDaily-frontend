import {useState} from "react";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed((curState) => !curState)
    }

    return (
        <aside className={"fixed group h-screen items-center flex flex-col bg-white shadow-xl/60 transition-all duration-300 pt-8" + (isCollapsed ? " w-64" : " w-20 hover:w-64")}>
            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100" onClick={handleCollapse}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <section className={"mt-10 mb-10" + (isCollapsed ? " " : " hidden group-hover:inline")}>
                <p>/HomePage</p>
            </section>
            <button className="p-4 w-fit h-fit rounded-full hover:bg-stone-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className={"size-12" + (isCollapsed ? " " : " hidden group-hover:inline")}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </button>
        </aside>
    );
}

export default Sidebar;