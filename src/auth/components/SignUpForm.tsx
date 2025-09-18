import React, {type FormEvent, useState} from "react";

const SignUpForm = () => {

    const [errors, setErrors] = useState({
        nickname: "",
        email: "",
        password: ""
    });

    const BASE_URL: string = import.meta.env.VITE_BASE_URL;
    const API_VER: string = import.meta.env.VITE_API_VER;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log("test");

        try {
            const response = await fetch(BASE_URL + API_VER + '/users', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to register');
        } catch (error: unknown) {

            let errorMessage = 'Unknown error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            /*
            setErrors(prevErrors => ({
                ...prevErrors,
                tags: errorMessage === "Tags upload error" ? "Failed to upload tags" : prevErrors.tags,
                content: errorMessage === "Failed to submit post" ? "Failed to submit post" : prevErrors.content,
            }));
             */
        }
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}
            className="w-90 h-fit mt-6 flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">Sign-up</h1>
            <input
                name="username" placeholder="Enter your nickname"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="email" placeholder="Enter your email"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="password" placeholder="Enter your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="confirmPassword" placeholder="Confirm your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <button className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100">
                Register
            </button>
        </form>
    );
}

export default SignUpForm;