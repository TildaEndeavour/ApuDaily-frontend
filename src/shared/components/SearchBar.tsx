import {Search} from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex flex-row">
            <section className="w-full flex flex-row items-center gap-2 border-1 rounded-3xl p-4">
                <Search size={24} strokeWidth={1}/>
                <input id="search" placeholder="Enter your search request..." className="w-full h-fit focus:outline-none rounded-3xl"/>
            </section>
        </div>
    );
}

export default SearchBar;