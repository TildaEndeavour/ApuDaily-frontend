import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex flex-row items-center pl-4 gap-2 border-1 rounded-3xl h-fit w-1/3">
            <Search size={24} strokeWidth={1}/>
            <input id="search" placeholder="Enter your search request..." className="w-full h-fit focus:outline-none rounded-3xl p-3"/>
        </div>
    );
}

export default SearchBar;