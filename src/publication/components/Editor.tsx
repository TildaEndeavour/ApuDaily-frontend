"use client";
import React, {type RefObject, useEffect, useRef} from "react";
import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import Thumbnail from "../model/Thumbnail.ts";
import Counter from "./quill-modules/Counter.ts";
import type {Post} from "../model/Post.ts";
import axios from "axios";

interface QuillEditorProps {
    value?: string;
    onChange?: <K extends keyof Post>(key: K, value: Post[K]) => void;
    options?: QuillOptions;
    ref: RefObject<Quill | null>;
}

const fontFamilyArr = ["Times New Roman", "Roboto Condensed", "Calibri", "Calibri Light", "Sans-Serif"];
const fonts: any = Quill.import("attributors/style/font");
fonts.whitelist = fontFamilyArr;
Quill.register(fonts, true);

const fontSizeArr = ['8px', '10px', '12px','14px',
    '16px', '18px', '20px', '22px',
    '24px', '26px', '28px', '36px',
    '48px', '72px'];

const Size: any = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

Quill.register('modules/counter', Counter);

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, ref}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current && !ref.current) {
            ref.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: {
                        container: [
                            [{font: fontFamilyArr}],
                            [{ size: fontSizeArr }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline"],
                            [{ align: ['', 'center', 'right', 'justify'] }, {list: 'ordered'}, {list: 'bullet'}],
                            ["link", "image"],
                            ['clean']
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

                                    const res = await axios.post(
                                        import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/upload',
                                        formData,
                                        {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }
                                    );

                                    const data: Thumbnail = await res.data;

                                    const quill = ref.current;
                                    if(!quill) return;
                                    const range = quill.getSelection();
                                    if(range){
                                        quill.insertEmbed(range.index, "image", import.meta.env.VITE_BASE_URL + data.url);
                                        quill.setSelection(range.index + 1);
                                    }
                                }
                            }
                        }
                    },
                    counter: {
                        unit: 'char',
                        limit: 50000,
                        minimum: 300
                    }
                }
            });

            if (value) {
                ref.current.root.innerHTML = value;
            }

            ref.current.on("text-change", () => {
                if (onChange) {
                    const text = ref.current!.getText().trim();
                    if (text === "") {
                        onChange("content","");
                    } else {
                        onChange("content", ref.current!.root.innerHTML);
                    }
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
        <div className="h-96 pb-12 w-full">
            <div ref={editorRef} className="h-full overflow-y-auto rounded-b-md"/>
            <div id="counter"/>
        </div>
    );
};

export default QuillEditor;
