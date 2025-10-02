import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
    onUpdateQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onUpdateQuery }) => {
    return (
        <div className="flex flex-row">
            <section className="w-full flex flex-row items-center gap-2 border-1 rounded-3xl p-4">
                <Search size={24} strokeWidth={1} />
                <input
                    id="search"
                    placeholder="Enter your search request..."
                    className="w-full h-full focus:outline-none"
                    onChange={(e) => onUpdateQuery(e.target.value)}
                />
            </section>
        </div>
    );
};

export default SearchBar;
