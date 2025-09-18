import React from "react";
import {X} from "lucide-react";
import { createPortal } from "react-dom";

interface PostPreviewProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalCard: React.FC<PostPreviewProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-row">
                <div className="bg-white rounded-4xl shadow-lg p-6 w-fit h-fit">
                    {children}
                </div>
                <div className="flex items-start">
                    <button
                        onClick={onClose}
                        className="ml-4 p-3 bg-gray-100 rounded-full flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <X size={32} color="red"/>
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ModalCard;