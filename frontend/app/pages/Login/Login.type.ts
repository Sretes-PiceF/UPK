import { Dispatch, SetStateAction } from "react";

export interface LoginType {
    handleLogin: (e: React.FormEvent) => Promise<void>
    setUsername: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    error: string;
    username: string;
    password: string;
    isLoading: boolean;
}

export interface LoginResponse {
    message: string;
}
