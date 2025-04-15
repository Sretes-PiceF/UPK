"use client";

import LoginView from './Login.view';
import { FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import client from '@/lib/axiosConfig';
import { useRouter } from 'next/navigation';
import { storeAuthData, getValidToken } from '@/services/authService';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (getValidToken()) {
            router.replace('/Admin/profile_admin');
        }
    }, [router]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);

            const response = await client.post('/api/login', payload);
            const token = response.data?.message;

            if (!token) {
                throw new Error('No token received');
            }

            storeAuthData(token);
            router.replace('/Admin/profile_admin');
        } catch (error) {
            let errorMessage = 'Login failed';

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginView
            username={username}
            password={password}
            error={error}
            isLoading={isLoading}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
    );
}