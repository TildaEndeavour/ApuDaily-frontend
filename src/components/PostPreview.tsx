import React from "react";
import {X} from "lucide-react";
import DOMPurify from 'dompurify';

interface PostPreviewProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PostPreview: React.FC<PostPreviewProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    const cleanHTML = typeof children === 'string' ? DOMPurify.sanitize(children) : null;

    if(!cleanHTML) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-6 pb-10 w-6/10 h-8/10">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <X size={24} color="red"/>
                    </button>
                </div>
                <div className="h-full overflow-y-auto ql-editor"
                     dangerouslySetInnerHTML={{ __html: cleanHTML }}>
                </div>
            </div>
        </div>
    );
}

export default PostPreview;