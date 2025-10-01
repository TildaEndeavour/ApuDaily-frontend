import {LoginRequest, SignUpRequest} from "../model/Requests.ts";
import axios from "axios";

export const login = async(requestBody: LoginRequest) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER + '/users/auth/login', requestBody);
    return {
        status: response.status,
        body: response.data,
    };
};

export const signUp = async(requestBody: SignUpRequest) => {
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