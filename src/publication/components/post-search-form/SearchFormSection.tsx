import {CircleDot, CircleX, Settings} from "lucide-react";
import React, {type ReactNode, useState} from "react";
import CollectionPicker from "../../../shared/components/CollectionPicker.tsx";

const SearchFormSection: React.FC<{
    badge: ReactNode,
    itemIcon: ReactNode,
    name: string,
    defaultMessage: string,
    items: any[],
    selectedItems: any[],
    onSelectItem: (item: any) => void,
    onRemoveItem: (item: any) => void
}> = ({badge, itemIcon, name, defaultMessage, items, selectedItems, onSelectItem, onRemoveItem}) => {
    const [isShowModal, setIsShowModal] = useState(false);

    return (
        <section className="pt-3 px-6 flex flex-col border-b-1">
            <section className="flex flex-row justify-between">
                    <span className="flex flex-row items-center mb-4 gap-4">
                        {badge}
                        <p>{name}</p>
                    </span>
                <button onClick={() => setIsShowModal((prevState) => !prevState)}><Settings size={32} strokeWidth={1}/></button>
            </section>
            <span className="flex flex-row items-center py-2 gap-4 mb-4 overflow-x-auto">
                {selectedItems.length > 0
                    ? selectedItems.map(item =>
                        <span key={item.id} className="flex flex-row gap-2 items-center">
                            {itemIcon}
                            {item.name ? item.name : item.username}
                            <button onClick={() => onRemoveItem(item)}>
                                <CircleX size={24} strokeWidth={1} color="red"/>
                            </button>
                        </span>)
                    : <>
                        <CircleDot size={24} strokeWidth={1} color="red"/>
                        <p>{defaultMessage}</p>
                      </>
                }
            </span>
            {isShowModal && <CollectionPicker items={items} selectedItems={selectedItems} onSelectItem={onSelectItem}/>}
        </section>
    );
}

export default SearchFormSection;