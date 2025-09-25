import {Pencil} from "lucide-react";

const EditPostInvite: React.FC<{onSelect: () => void}> = ({onSelect}) => {
    return (
        <div className="p-8 w-fit h-fit shadow-2xl bg-gray-100 rounded-2xl animate-fade-left"
            onClick={onSelect}
        >
            <Pencil size={36} strokeWidth={1}/>
        </div>
    );
}

export default EditPostInvite;