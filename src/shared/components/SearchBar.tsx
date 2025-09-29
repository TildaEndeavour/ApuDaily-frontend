import {LayoutGrid, Rows3, Search} from "lucide-react";

const SearchBar: React.FC<{onChangeLayout: (isGridLayout: boolean) => void}> = ({onChangeLayout}) => {
    return (
        <div className="flex flex-col gap-2 h-fit w-1/3">
            <section className="flex flex-row items-center pl-4 gap-2 border-1 rounded-3xl">
                <Search size={24} strokeWidth={1}/>
                <input id="search" placeholder="Enter your search request..." className="w-full h-fit focus:outline-none rounded-3xl p-4"/>
            </section>
            <section className="flex flex-row w-full">
                <button onClick={() => onChangeLayout(true)} className="p-1 hover:bg-gray-200 rounded-2xl"><LayoutGrid size={24} strokeWidth={1}/></button>
                <button onClick={() => onChangeLayout(false)} className="p-1 hover:bg-gray-200 rounded-2xl"><Rows3 size={24} strokeWidth={1}/></button>
            </section>
        </div>
    );
}

export default SearchBar;