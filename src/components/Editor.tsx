"use client";
import React, { useEffect, useRef } from "react";
import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    options?: QuillOptions;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ size: ["small", "large", "huge", false] }],
                        ["bold", "italic", "underline"],
                        ["image", "code-block"],
                    ],
                }
            });

            if (value) {
                quillRef.current.root.innerHTML = value;
            }

            quillRef.current.on("text-change", () => {
                if (onChange) {
                    onChange(quillRef.current!.root.innerHTML);
                }
            });
        }
    });

    useEffect(() => {
        if (quillRef.current && value !== undefined && quillRef.current.root.innerHTML !== value) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="h-96 w-full">
            <div ref={editorRef} className="overflow-y-auto border border-gray-300 rounded-b-md"/>
        </div>
    );
};

export default QuillEditor;
