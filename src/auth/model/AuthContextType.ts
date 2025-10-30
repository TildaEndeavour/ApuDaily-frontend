import type {User} from "./User.ts";

export interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    setTokens: (access: string, refresh: string) => void;
    setUser: (user: User) => void;
    removeTokens: () => void;
}