import type LoginRequestDto from "../model/LoginRequestDto.ts";

export const login = async(requestBody: LoginRequestDto) => {
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