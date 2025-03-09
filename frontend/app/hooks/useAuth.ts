"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types/auth";

export const useAuth = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (!token || !userData) {
                router.push("/login");
            } else {
                setUser(JSON.parse(userData));
            }
        }
    }, [router]);

    return { user };
};