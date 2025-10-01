import {useState} from "react";
import {Search} from "lucide-react";

type CollectionPickerProps = {
    items: any[],
    selectedItems: any[],
    onSelectItem: (item: any) => void
};

const CollectionPicker = ({ items, selectedItems, onSelectItem }: CollectionPickerProps) => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = items.filter(item => {
            const field = item.name ? item.name : item.username;
            return (field.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedItems.includes(item))
        }
    );

    return (
        <div className="w-full h-fit p-4 flex flex-col bg-white rounded-3xl animate-fade-down">
            <section className="w-full flex flex-row items-center gap-2 border-1 rounded-3xl p-2">
                <Search size={24} strokeWidth={1}/>
                <input
                    id="search"
                    placeholder="Enter tag name..."
                    className="w-full h-fit focus:outline-none rounded-3xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>
            <div className="w-full h-max-50 flex p-2 gap-2 flex-wrap overflow-y-scroll">
                {filteredItems.map(item => (
                    <button
                        key={item.id}
                        className="border-1 w-fit h-fit rounded-3xl p-2"
                        onClick={() => onSelectItem(item)}
                    >
                        {item.name ? item.name : item.username}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CollectionPicker;