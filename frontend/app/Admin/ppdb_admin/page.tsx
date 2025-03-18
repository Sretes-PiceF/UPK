'use client'

import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import { Pencil } from "lucide-react"
import { Trash } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const HalPertama = () => {
    const [ppdbData, setPpdbData] = useState([]);
    const [gambarData, setGambarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchData();
        fetchGambarData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/ppdb");
            if (result.data && Array.isArray(result.data.data)) {
                setPpdbData(result.data.data.slice(0, 1)); // Ambil satu data utama
            }
        } catch (error) {
            console.error("Gagal mengambil data PPDB", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGambarData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/ppdb");
            if (result.data && Array.isArray(result.data.data)) {
                setGambarData(result.data.data); // Ambil semua data gambar
            }
        } catch (error) {
            console.error("Gagal mengambil data gambar", error);
        }
    };

    const isDataFilled = () => {
        return ppdbData.some(data =>
            data.ppdb_deskripsi1 &&
            data.ppdb_deskripsi2 &&
            data.ppdb_namaguru_1 &&
            data.ppdb_namaguru_2 &&
            data.ppdb_notelp_1 &&
            data.ppdb_notelp_2
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const deletePpdb = async (ppdb_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/ppdb/${ppdb_id}`);
            alert("Sukses menghapus");
            setPpdbData((prevData) => prevData.filter(item => item.ppdb_id !== ppdb_id));
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
                        <h1 className="text-2xl font-bold">PPDB</h1>
                        <p className="text-gray-600 p-4">Halaman Data PPDN</p>
                        {!isDataFilled() && (
                            <Link href="/Admin/ppdb_admin/store_admin">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                                    Tambah Data
                                </button>
                            </Link>
                        )}
                        {isDataFilled() && (
                            <div className="flex items-center mb-4">
                                <Link href="/Admin/ppdb_admin/store_admin/store_gambar">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Tambah Gambar
                                    </button>
                                </Link>
                            </div>
                        )}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border">No</th>
                                        <th className="px-4 py-2 border">Deskripsi 1</th>
                                        <th className="px-4 py-2 border">Deskripsi 2</th>
                                        <th className="px-4 py-2 border">Nama Guru 1</th>
                                        <th className="px-4 py-2 border">Nama Guru 2</th>
                                        <th className="px-4 py-2 border">No Guru 1</th>
                                        <th className="px-4 py-2 border">No Guru 2</th>
                                        <th className="px-4 py-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ppdbData.map((rs, index) => (
                                        <tr key={rs.ppdb_id || index}>
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_deskripsi1}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_deskripsi2}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_namaguru_1}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_namaguru_2}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_notelp_1}</td>
                                            <td className="px-4 py-2 border">{rs.ppdb_notelp_2}</td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex space-x-2">
                                                    <Link href={`/Admin/ppdb_admin/update_admin/Data/${rs.ppdb_id}`}>
                                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                            <Pencil />
                                                        </button>
                                                    </Link>
                                                    <button onClick={() => deletePpdb(rs.ppdb_id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                                        <Trash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">Data Gambar</h2>
                            <hr className="my-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {gambarData.map((gambar, index) => (
                                    <div key={index} className="border p-4 rounded-lg">
                                        <img src={gambar.ppdb_url_gambar} alt={`Gambar ${index + 1}`} className="w-full h-auto rounded-lg" />
                                        <div className="flex space-x-2 mt-2">
                                            <Link href={`/Admin/ppdb_admin/update_admin/Gambar/${gambar.ppdb_id}`}>
                                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                    <Pencil />
                                                </button>
                                            </Link>
                                            <button onClick={() => deletePpdb(gambar.ppdb_id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        </>
    )
}

export default HalPertama