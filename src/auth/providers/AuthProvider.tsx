import axios from "axios";
import React, {createContext, useCallback, useContext, useMemo, useState} from "react";

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
    removeToken: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [token, setToken_] = useState(localStorage.getItem('token'));

    const initialToken = localStorage.getItem('token');
    if (initialToken) axios.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;

    const setToken = useCallback((newToken: string) => {
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        setToken_(newToken);
    }, []);

    const removeToken = useCallback(() => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setToken_(null);
    }, []);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            removeToken
        }),
        [token, setToken, removeToken]
    );

    return(
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;