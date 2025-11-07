import axios from "axios";
import type {LoginRequestDto} from "../dto/LoginRequestDto.ts";
import type {SignUpRequestDto} from "../dto/SignUpRequestDto.ts";

export const authAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER,
});

export const unauthAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER,
});

export const login = async(requestBody: LoginRequestDto) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/auth/login', requestBody);
    return {
        status: response.status,
        body: response.data,
    };
};

export const signUp = async(requestBody: SignUpRequestDto) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users', requestBody);

    return {
        status: response.status,
        body: response.data,
    };
};

export const getUserDetails = async (accessToken: string) => {
    const response = await axios.get(
        import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/me',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return {
        status: response.status,
        body: response.data,
    };
};