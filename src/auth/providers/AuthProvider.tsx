import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type {User} from "../model/User.ts";
import {getUserDetails} from "../services/auth.ts";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    setTokens: (access: string, refresh: string) => void;
    setUser: (user: User) => void;
    removeTokens: () => void;
}

export const authAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER,
});

export const unauthAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VER,
});

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });


    useEffect(() => {
        if (accessToken) {
            authAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        } else {
            delete authAxios.defaults.headers.common["Authorization"];
        }
    }, [accessToken]);

    const setTokens = useCallback((access: string, refresh: string) => {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        setAccessToken(access);
        setRefreshToken(refresh);
    }, []);

    const removeTokens = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & {
                    _retry?: boolean;
                    _retryCount?: number;
                };

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    (originalRequest._retryCount ?? 0) < 1 &&
                    refreshToken
                ) {
                    originalRequest._retry = true;
                    originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

                    try {
                        const res = await unauthAxios.post("/users/auth/refresh", { refreshToken });
                        const newAccess = res.data?.token;
                        if (!newAccess) {
                            throw new Error("Не удалось получить новый access token");
                        }

                        setTokens(newAccess, refreshToken);

                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newAccess}`,
                        };

                        return authAxios(originalRequest);
                    } catch (refreshError) {
                        console.log(refreshError);
                        removeTokens();
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            authAxios.interceptors.response.eject(interceptor);
        };
    }, [accessToken, refreshToken, setTokens, removeTokens]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!accessToken || user) return; // уже загружено или токена нет

            try {
                const res = await getUserDetails(accessToken);
                if (res.status === 200) {
                    setUser(res.body);
                    localStorage.setItem("user", JSON.stringify(res.body));
                }
            } catch (err) {
                console.warn("Ошибка при получении данных пользователя", err);
                removeTokens();
            }
        };

        fetchUser();
    }, [accessToken]);

    const contextValue = useMemo(
        () => ({
            accessToken,
            refreshToken,
            user,
            setTokens,
            removeTokens,
        }),
        [accessToken, refreshToken, user, setTokens, removeTokens]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
