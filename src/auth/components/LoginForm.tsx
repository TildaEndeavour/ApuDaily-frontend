import {type ChangeEventHandler, type FormEvent, useState} from "react";
import ModalCard from "../../shared/components/ModalCard.tsx";
import SignUpForm from "./SignUpForm.tsx";
import {useAuth} from "../providers/AuthProvider.tsx";
import {validateLoginForm} from "../services/validation.ts";
import {login} from "../services/auth.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";

const LoginForm = () => {

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const [formValidator, setFormValidator] = useState<FormValidator>();
    const { setToken } = useAuth();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValidator(validateLoginForm(formData.usernameOrEmail, formData.password));

        if (formValidator && !formValidator.isValid) return;

        try {
            const response = await login(formData);
            if (response.status === 200) setToken(response.body.token);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <form onSubmit={(event) => handleSubmit(event)}
            className="w-80 h-fit mt-6 flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">Log-in</h1>
            <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                placeholder="Login"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages[0]["usernameOrEmail"]) &&
                <div className="text-xs text-red-900">{formValidator.messages[0]["usernameOrEmail"]}</div>}
            <input
                id="password"
                name="password"
                placeholder="Password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages[1]["password"]) &&
                <div className="text-xs text-red-900">{formValidator.messages[1]["password"]}</div>}
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