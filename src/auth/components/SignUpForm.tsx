import {type ChangeEventHandler, type FormEvent, useState} from "react";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import {signUp} from "../services/auth.ts";
import type {SignUpInputs} from "../model/AuthFormInputs.ts";
import {validateSignUpForm} from "../services/validation.ts";

const SignUpForm = () => {
    const [formData, setFormData] = useState<SignUpInputs>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formValidator, setFormValidator] = useState<FormValidator>();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValidator(validateSignUpForm(formData));
        if (formValidator && !formValidator.isValid) return;

        try {
           const response = await signUp(formData);
           if (response.status === 200) console.log("User created");
        } catch (error: unknown) {
            console.log(error);
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}
            className="w-90 h-fit mt-6 flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">Sign-up</h1>
            <input
                id="username"
                name="username"
                placeholder="Enter your nickname"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages.username) &&
                <div className="text-xs text-red-900">{formValidator.messages.username}</div>}
            <input
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages.email) &&
                <div className="text-xs text-red-900">{formValidator.messages.email}</div>}
            <input
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages.password) &&
                <div className="text-xs text-red-900">{formValidator.messages.password}</div>}
            <input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="border-1 h-fit p-4 ml-4 rounded-3xl"
                onChange={handleChange}
            />
            {(!formValidator?.isValid && formValidator?.messages.confirmPassword) &&
                <div className="text-xs text-red-900">{formValidator.messages.confirmPassword}</div>}
            <button className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100">
                Register
            </button>
        </form>
    );
}

export default SignUpForm;