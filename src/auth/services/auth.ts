import {LoginRequest, SignUpRequest} from "../model/Requests.ts";

export const login = async(requestBody: LoginRequest) => {
    const response = await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};

export const signUp = async(requestBody: SignUpRequest) => {
    const response = await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};