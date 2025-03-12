'use client';

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HalPertama = () => {
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/profile");
            if (result.data && Array.isArray(result.data.data)) {
                setProfileData(result.data.data);
            } else {
                console.error("Data format is invalid:", result.data);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">Profil</h1>
                    <p className="text-gray-600 p-4">Halaman Data Profil</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Input data guru</th>
                                    <th className="px-4 py-2 border">Input data siswa</th>
                                    <th className="px-4 py-2 border">Input data jumlah prestasi</th>
                                    <th className="px-4 py-2 border">Input data jumlah Ekstrakulikuler</th>
                                    <th className="px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profileData.map((rs, index) => (
                                    <tr key={rs.id || index}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{rs.profile_guru}</td>
                                        <td className="px-4 py-2 border">{rs.profile_siswa}</td>
                                        <td className="px-4 py-2 border">{rs.jumlah_prestasi}</td>
                                        <td className="px-4 py-2 border">{rs.jumlah_ekstrakulikuler}</td>
                                        <td className="px-4 py-2 border">
                                            <Link href={`/Admin/profile_admin/update_admin/${rs.id}`}>
                                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                    <Pencil />
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
        </>
    );
};

export default HalPertama;