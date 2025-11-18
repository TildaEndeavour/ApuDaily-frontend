import React, {type ChangeEventHandler, type FormEvent, useState} from "react";
import {validateLoginForm} from "../services/validation.ts";
import {login} from "../services/auth.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import {useAuth} from "../hooks/useAuth.ts";
import type {LoginFormInputs} from "../model/LoginFormInputs.ts";
import PasswordInput from "../../shared/components/PasswordInput.tsx";

const LoginForm: React.FC<{ onClose: () => void; onSwitchToSignUp: () => void }> = ({ onClose, onSwitchToSignUp }) => {

    const [formData, setFormData] = useState<LoginFormInputs>({
        usernameOrEmail: '',
        password: ''
    })
    const [formValidator, setFormValidator] = useState<FormValidator>();
    const { setTokens } = useAuth();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validator = validateLoginForm(formData);
        setFormValidator(validator);
        if (!validator.isValid) return;

        try {
            const response = await login(formData);
            if (response.status === 200) setTokens(response.body.accessToken, response.body.refreshToken);
            onClose();
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
        <>
            <form onSubmit={(event) => handleSubmit(event)}
                  className="p-8 w-80 h-fit flex flex-col items-center gap-4 bg-white rounded-2xl border-1">
                <h1 className="text-lg font-bold">Login</h1>
                <section className="flex flex-col gap-6">
                    <input
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        placeholder="Login"
                        className="border-1 h-fit w-full p-4 rounded-3xl"
                        onChange={handleChange}
                    />
                    {(!formValidator?.isValid && formValidator?.messages.usernameOrEmail) &&
                        <div className="text-xs text-red-900">{formValidator.messages.usernameOrEmail}</div>}
                    <PasswordInput name="password" placeholder="Password" onChange={handleChange}/>
                    {(!formValidator?.isValid && formValidator?.messages.password) &&
                        <div className="text-xs text-red-900">{formValidator.messages.password}</div>}
                </section>
                <button
                    type="submit"
                    className="border-1 h-fit w-full p-4 hover:bg-gray-100"
                >
                    Log-in
                </button>
                <span className="flex flex-col gap-2">
                    <p>Don't have an account? </p>
                    <button
                        type="button"
                        className="font-bold"
                        onClick={() => onSwitchToSignUp()}
                    >
                        Register
                    </button>
                </span>
            </form>
        </>
    );
}

export default LoginForm;