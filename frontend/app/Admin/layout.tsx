// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kelompok Two",
    icons: {
        icon: "/admin.ico",
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
