import Login from "@/app/pages/Login/Login";
import { memo } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Login",
    icons: {
        icon: "/admin.ico",
    },
};

export default memo(Login)
