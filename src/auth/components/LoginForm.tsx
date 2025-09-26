import {type ChangeEventHandler, type FormEvent, useState} from "react";
import {useAuth} from "../providers/AuthProvider.tsx";
import {validateLoginForm} from "../services/validation.ts";
import {login} from "../services/auth.ts";
import type {FormValidator} from "../../shared/model/FormValidator.ts";
import type {LoginInputs} from "../model/AuthFormInputs.ts";

const LoginForm: React.FC<{ onClose: () => void; onSwitchToSignUp: () => void }> = ({ onClose, onSwitchToSignUp }) => {

    const [formData, setFormData] = useState<LoginInputs>({
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
                <h1 className="text-lg font-bold">Log-in</h1>
                <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    placeholder="Login"
                    className="border-1 h-fit p-4 ml-4 rounded-3xl"
                    onChange={handleChange}
                />
                {(!formValidator?.isValid && formValidator?.messages.usernameOrEmail) &&
                    <div className="text-xs text-red-900">{formValidator.messages.usernameOrEmail}</div>}
                <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="border-1 h-fit p-4 ml-4 rounded-3xl"
                    onChange={handleChange}
                />
                {(!formValidator?.isValid && formValidator?.messages.password) &&
                    <div className="text-xs text-red-900">{formValidator.messages.password}</div>}
                <button
                    type="submit"
                    className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100"
                >
                    Log-in
                </button>
                <button
                    type="button"
                    className="border-1 h-fit p-4 ml-4 rounded-3xl hover:bg-gray-100"
                    onClick={() => onSwitchToSignUp()}
                >
                    Sign-up
                </button>
            </form>
        </>
    );
}

export default LoginForm;