'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Profile = {
    id: number;
    profile_guru: string;
    profile_siswa: string;
    jumlah_prestasi: number;
    jumlah_ekstrakulikuler: number;
};

const HalPertama = () => {
    const [profileData, setProfileData] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/profile");
                const data = response.data?.data;

                if (Array.isArray(data)) {
                    setProfileData(data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-600">Memuat data...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-8 bg-white rounded-lg shadow-lg m-4 overflow-auto">
                    <h1 className="text-2xl font-bold mb-2">Profil</h1>
                    <p className="text-gray-600 mb-6">Halaman Data Profil</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Data Guru</th>
                                    <th className="px-4 py-2 border">Data Siswa</th>
                                    <th className="px-4 py-2 border">Jumlah Prestasi</th>
                                    <th className="px-4 py-2 border">Jumlah Ekstrakurikuler</th>
                                    <th className="px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profileData.map((profile, index) => (
                                    <tr key={profile.id}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{profile.profile_guru}</td>
                                        <td className="px-4 py-2 border">{profile.profile_siswa}</td>
                                        <td className="px-4 py-2 border">{profile.jumlah_prestasi}</td>
                                        <td className="px-4 py-2 border">{profile.jumlah_ekstrakulikuler}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <Link href={`/Admin/profile_admin/update_admin/${profile.id}`}>
                                                <button
                                                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                                                    title="Edit Profil"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default HalPertama;
