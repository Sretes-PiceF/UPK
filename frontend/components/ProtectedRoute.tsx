"use client"; // Pastikan komponen ini hanya dijalankan di client-side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Cek apakah token ada di localStorage
        const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

        if (!token) {
            // Jika tidak ada token, redirect ke halaman login
            router.push("/Login");
        } else {
            // Jika ada token, izinkan akses
            setIsAuthenticated(true);
        }
    }, [router]);

    // Tampilkan loading spinner atau pesan saat memeriksa autentikasi
    if (!isAuthenticated) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;