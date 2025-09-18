import React, {type FormEvent, useState} from "react";
import ModalCard from "../../shared/components/ModalCard.tsx";
import SignUpForm from "./SignUpForm.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";

const LoginForm = () => {

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const { setToken } = useAuth();

    const BASE_URL: string = import.meta.env.VITE_BASE_URL;
    const API_VER: string = import.meta.env.VITE_API_VER;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log("test");

        try {
            const response = await fetch(BASE_URL + API_VER + '/users/auth/login', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to login');
            const data = await response.json()
            console.log(data.token);
            setToken(data.token);
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
            className="w-fit h-fit mt-6 flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">Log-in</h1>
            <input
                name="usernameOrEmail" placeholder="Login"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <input
                name="password" placeholder="Password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
            />
            <button
                type="submit"
                className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100"
            >
                Log-in
            </button>
            <button
                type="button"
                className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100"
                onClick={() => setIsSignUpOpen(true)}
            >
                Sign-up
            </button>
            <ModalCard isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
                <SignUpForm/>
            </ModalCard>
        </form>
    );
}

export default LoginForm;