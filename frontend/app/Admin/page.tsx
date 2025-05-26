import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kelompok Two",
    icons: {
        icon: "/admin.ico",
    },
};

export default function AdminPage() {
    return (
        <div>
            <h1>Selamat Datang Admin</h1>
        </div>
    );
}
