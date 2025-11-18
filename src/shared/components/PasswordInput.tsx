import {Eye, EyeClosed} from "lucide-react";
import React, {type ChangeEventHandler, useState} from "react";

const PasswordInput: React.FC<{name: string, onChange: ChangeEventHandler<HTMLInputElement>, placeholder: string}> = ({onChange, placeholder, name}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="border-1 rounded-3xl flex flex-row p-4 gap-2">
            <input
                id={name}
                name={name}
                type={isShowPassword ? "" : "password"}
                placeholder={placeholder}
                className="h-fit focus:outline-none focus:border-none"
                onChange={onChange}
            />
            <button
                type="button"
                onClick={() => setIsShowPassword((prevState) => !prevState)}
            >
                {isShowPassword ? <EyeClosed size={24} strokeWidth={1}/> : <Eye size={24} strokeWidth={1}/>}
            </button>
        </div>
    );
}

export default PasswordInput;