"use client";

import axios from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${typeof window !== "undefined" ? window.localStorage.getItem("token") ?? null : null}`
    }
});


export const setAuthToken = (token: string | null) => {
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete client.defaults.headers.common['Authorization'];
    }
}
if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    setAuthToken(token)
}
export default client;
