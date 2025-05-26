// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    icons: {
        icon: "/admin.ico",
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
