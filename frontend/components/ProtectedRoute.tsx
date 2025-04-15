"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkTokenExpiry, clearAuthData } from '@/services/authService';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!checkTokenExpiry()) {
                clearAuthData();
                router.replace('/Login');
                return false;
            }
            return true;
        };

        // Initial check
        if (checkAuth()) {
            setAuthChecked(true);
        }

        // Set up periodic check
        const interval = setInterval(checkAuth, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [router]);

    if (!authChecked) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;