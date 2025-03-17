'use client'

import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import { Pencil, Trash } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useState } from "react"
import axios from "axios"

const Halpertama = () => {
    const [ekstrakulikulerData, setEkstrakulikulerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/ekstrakulikuler")
            if (result.data && Array.isArray(result.data.data)) {
                setEkstrakulikulerData(result.data.data);
            } else {
                console.error("Data tidak ada", result.data);
            }
        } catch (error) {
            console.error("Data error", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    const deleteEkstrakulikuler = async (ekstrakulikuler_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`);
            alert("Sukses menghapus");
            setEkstrakulikulerData((prevData) => prevData.filter(item => item.ekstrakulikuler_id !== ekstrakulikuler_id));
        } catch (error) {
            console.error("Gagal menghapus data", error);
            alert("Gagal menghapus data!");
        }
    }
    return (
        <>
            <ProtectedRoute>
                <div className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                        <h1 className="text-2xl font-bold">Ekstrakulikuler</h1>
                        <p className="text-gray-600 p-4">Halaman Data Ekstrakulikuler</p>
                        <Link href="/Admin/ekstrakulikuler_admin/store_admin">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                                Tambah Data
                            </button>
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border">No</th>
                                        <th className="px-4 py-2 border">Judul</th>
                                        <th className="px-4 py-2 border">Deskripsi</th>
                                        <th className="px-4 py-2 border">Gambar</th>
                                        <th className="px-4  py-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ekstrakulikulerData.map((rs, index) => (
                                        <tr key={rs.ekstrakulikuler_id || index}>
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{rs.ekstrakulikuler_judul}</td>
                                            <td className="px-4 py-2 border">{rs.ekstrakulikuler_deskripsi}</td>
                                            <td className="px-4 py-2 border">{rs.ekstrakulikuler_url_gambar}</td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex space-x-2">
                                                    <Link href={`/Admin/ekstrakulikuler_admin/update_admin/${rs.ekstrakulikuler_id}`}>
                                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                            <Pencil />
                                                        </button>
                                                    </Link>
                                                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700" onClick={() => deleteEkstrakulikuler(rs.ekstrakulikuler_id)}>
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

export default Halpertama