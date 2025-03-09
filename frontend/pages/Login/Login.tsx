"use client";

import LoginView from './Login.view'
import { FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import client from '@/lib/axiosConfig';
import { LoginResponse } from './Login.type';
import { useRouter } from 'next/navigation';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);

        try {
            const res: LoginResponse = await ((await client.post("/api/login", payload)).data);
            // alert(`Login Sukses\nToken:${res.message}`);
            router.push("/Admin/profile_admin");
            localStorage.setItem("token", res.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                // alert(JSON.stringify(error, null, 2))
                setError(error.response?.data.message)
            }
        }
    }

    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        if (token) {
            router.push("/Login")
        }
    }, [router])

    return <LoginView
        username={username}
        password={password}
        error={error}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
    />;
}
