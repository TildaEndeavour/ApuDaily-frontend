import React, {type ChangeEventHandler, type FormEvent, useState} from "react";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import {validateSignUpForm} from "../services/validation.ts";
import axios from "axios";
import type {SignUpFormInputs} from "../model/SignUpFormInputs.ts";
import type {SignUpRequestDto} from "../dto/SignUpRequestDto.ts";
import {signUp} from "../services/auth.ts";
import PasswordInput from "../../shared/components/PasswordInput.tsx";

const SignUpForm: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {

    const [formData, setFormData] = useState<SignUpFormInputs>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formValidator, setFormValidator] = useState<FormValidator>();
    const [result, setResult] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValidator(validateSignUpForm(formData));
        if (formValidator && !formValidator.isValid) return;

        const request: SignUpRequestDto = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        }

        try {
            await signUp(request);
            setResult("User created!");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setResult(error.response?.data.message)
            } else {
                setResult('Unknown error:' + error);
            }
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
                  className="w-fit p-8 h-fit flex flex-col gap-4 rounded-2xl bg-white border-1"
            >
                <h1 className="text-lg font-bold">Sign-up</h1>
                <section className="flex flex-row gap-6">
                    <section className="flex flex-col gap-4">
                        <input
                            id="username"
                            name="username"
                            placeholder="Enter your nickname"
                            className="border-1 h-fit w-full p-4 rounded-3xl"
                            onChange={handleChange}
                        />
                        {(!formValidator?.isValid && formValidator?.messages.username) &&
                            <div className="text-xs text-red-900">{formValidator.messages.username}</div>}
                        <input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="border-1 h-fit w-full p-4 rounded-3xl"
                            onChange={handleChange}
                        />
                        {(!formValidator?.isValid && formValidator?.messages.email) &&
                            <div className="text-xs text-red-900">{formValidator.messages.email}</div>}

                        <PasswordInput name="password" placeholder="Enter your password" onChange={handleChange}/>
                        {(!formValidator?.isValid && formValidator?.messages.password) &&
                            <div className="text-xs text-red-900">{formValidator.messages.password}</div>}

                        <PasswordInput name="confirmPassword" placeholder="Confirm your password" onChange={handleChange}/>
                        {(!formValidator?.isValid && formValidator?.messages.confirmPassword) &&
                            <div className="text-xs text-red-900">{formValidator.messages.confirmPassword}</div>}

                        {(formValidator && formValidator.isValid) ? <div className="w-90 p-1 flex justify-center border-1 bg-red-200">{result}</div> : ""}
                    </section>
                    <section className="flex flex-col px-4 justify-center gap-6">
                        <button className="border-1 h-fit p-4 hover:bg-gray-100">
                            Register
                        </button>
                        <span className="flex flex-col gap-2">
                        <p>Already have an account?</p>
                        <button
                            type="button"
                            className="font-bold"
                            onClick={onSwitchToLogin}
                        >
                            Back to Login
                        </button>
                    </span>
                    </section>
                </section>
            </form>
    );
}

export default SignUpForm;