"use client";
import React, {type RefObject, useEffect, useRef} from "react";
import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    options?: QuillOptions;
    ref: RefObject<Quill | null>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, ref}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current && !ref.current) {
            ref.current = new Quill(editorRef.current, {
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

                                    const quill = ref.current;
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
                ref.current.root.innerHTML = value;
            }

            ref.current.on("text-change", () => {
                if (onChange) {
                    onChange(ref.current!.root.innerHTML);
                }
            });
        }
    });

    useEffect(() => {
        if (ref.current && value !== undefined && ref.current.root.innerHTML !== value) {
            ref.current.root.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="h-96 w-full">
            <div ref={editorRef} className="overflow-y-auto border border-gray-300 rounded-b-md"/>
        </div>
    );
};

export default QuillEditor;
