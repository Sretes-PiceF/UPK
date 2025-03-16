'use client'

import Link from "next/link"
import { Pencil } from "lucide-react"
import { Trash } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const HalPertama = () => {
    const [prestasiData, setPrestasiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/prestasi");
            if (result.data && Array.isArray(result.data.data)) {
                setPrestasiData(result.data.data);
            } else {
                console.error("Data tidak ada", result.data);
            }
        } catch (error) {
            console.error("Data eror di dapat", error);
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <div>Loading...</div>
    }

    const deletePrestasi = async (prestasi_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/prestasi/${prestasi_id}`);
            alert("Sukses menghapus");

            // Perbarui state tanpa perlu fetch ulang data
            setPrestasiData((prevData) => prevData.filter(item => item.prestasi_id !== prestasi_id));
        } catch (error) {
            console.error("Gagal menghapus data", error);
            alert("Gagal menghapus data!");
        }
    };

    return (
        <>
            <ProtectedRoute>
                <div className="flex h-screen bg-gray-100">
                    <Sidebar />
                    <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                        <h1 className="text-2xl font-bold">Prestasi</h1>
                        <p className="text-gray-600 p-4">Halaman Update Data Prestasi</p>
                        <Link href="/Admin/prestasi_admin/store_admin">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                                Tambah Data
                            </button>
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border">No</th>
                                        <th className="px-4 py-2 border">Judul Juara</th>
                                        <th className="px-4 py-2 border">Nama</th>
                                        <th className="px-4 py-2 border">Deskripsi</th>
                                        <th className="px-4 py-2 border">Gambar</th>
                                        <th className="px-4 py-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prestasiData.map((rs, index) => (
                                        <tr key={rs.prestasi_id || index}>
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{rs.prestasi_juara}</td>
                                            <td className="px-4 py-2 border">{rs.prestasi_namasiswa}</td>
                                            <td className="px-4 py-2 border">{rs.prestasi_deskripsi}</td>
                                            <td className="px-4 py-2 border">{rs.prestasi_url_gambar}</td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex space-x-2">
                                                    <Link href={`/Admin/prestasi_admin/update_admin/${rs.prestasi_id}`}>
                                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                            <Pencil />
                                                        </button>
                                                    </Link>
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700" onClick={() => deletePrestasi(rs.prestasi_id)}>
                                                        <Trash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        </>
    )
}

export default HalPertama