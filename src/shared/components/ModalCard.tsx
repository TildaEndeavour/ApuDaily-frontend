import React, {useEffect, useRef} from "react";
import { createPortal } from "react-dom";

interface PostPreviewProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalCard: React.FC<PostPreviewProps> = ({isOpen, onClose, children}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex flex-row justify-center backdrop-blur-sm ql-editor h-screen w-screen animate-fade-down">
            <div ref={wrapperRef} className="p-1 my-auto flex justify-center overflow-y-auto h-fit w-max-2/3">
                {children}
            </div>
        </div>,
        document.body
    );
}

export default ModalCard;