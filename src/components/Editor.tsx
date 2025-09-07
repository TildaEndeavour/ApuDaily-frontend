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
                    toolbar: {
                        container: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ size: ["small", "large", "huge", false] }],
                            ["bold", "italic", "underline"],
                            ["image", "code-block"],
                        ],
                        handlers: {
                            image: function(){
                                const input = document.createElement("input");
                                input.setAttribute("type","file");
                                input.setAttribute("accept","image/*");
                                input.click();

                                input.onchange = async () => {
                                    const file = input.files?.[0];
                                    if(!file) return;

                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/upload',
                                        {
                                            method: "POST",
                                            body: formData
                                        }
                                    );

                                    const data = await res.json();
                                    console.log(data.path);

                                    const quill = quillRef.current;
                                    if(!quill) return;
                                    const range = quill.getSelection();
                                    if(range){
                                        quill.insertEmbed(range.index, "image", import.meta.env.VITE_BASE_URL + data.path);
                                        quill.setSelection(range.index + 1);
                                    }
                                }
                            }
                        }
                    },
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
