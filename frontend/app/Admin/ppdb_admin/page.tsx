'use client'

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { Pencil, Trash } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import axios from "axios"
import { useEffect, useState } from "react"

interface PPDBItem {
    ppdb_id: number;
    ppdb_deskripsi1: string;
    ppdb_deskripsi2: string;
    ppdb_namaguru_1: string;
    ppdb_namaguru_2: string;
    ppdb_notelp_1: string;
    ppdb_notelp_2: string;
    ppdb_url_gambar?: string;
}

const HalPertama = () => {
    const [ppdbData, setPpdbData] = useState<PPDBItem[]>([]);
    const [gambarData, setGambarData] = useState<PPDBItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const result = await axios.get("http://localhost:8000/api/ppdb");
            if (result.data && Array.isArray(result.data.data)) {
                const allData = result.data.data;
                setPpdbData(allData.slice(0, 1)); // hanya 1 untuk deskripsi utama
                setGambarData(allData); // semua untuk gambar
            }
        } catch (error) {
            console.error("Gagal mengambil data PPDB", error);
        } finally {
            setLoading(false);
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

    const deletePpdb = async (ppdb_id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/ppdb/${ppdb_id}`);
            alert("Sukses menghapus data");
            setPpdbData(prev => prev.filter(item => item.ppdb_id !== ppdb_id));
        } catch (error) {
            console.error("Gagal menghapus data", error);
            alert("Gagal menghapus data!");
        }
    };

    const deleteGambar = async (ppdb_id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/ppdb/${ppdb_id}`);
            alert("Sukses menghapus gambar");
            setGambarData(prev => prev.filter(item => item.ppdb_id !== ppdb_id));
        } catch (error) {
            console.error("Gagal menghapus gambar", error);
            alert("Gagal menghapus gambar!");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">PPDB</h1>
                    <p className="text-gray-600 p-4">Halaman Data PPDB</p>

                    {!isDataFilled() ? (
                        <Link href="/Admin/ppdb_admin/store_admin">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                                Tambah Data
                            </button>
                        </Link>
                    ) : (
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
                            <thead className="bg-gray-200">
                                <tr>
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
                                    <tr key={rs.ppdb_id}>
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
                                gambar.ppdb_url_gambar && (
                                    <div key={gambar.ppdb_id || index} className="border p-4 rounded-lg">
                                        <Image
                                            src={`http://localhost:8000/storage/images/ppdb/${gambar.ppdb_url_gambar}`}
                                            alt={`Gambar ${index + 1}`}
                                            width={400}
                                            height={300}
                                            className="w-full h-auto rounded-lg object-cover"
                                        />
                                        <div className="flex space-x-2 mt-2">
                                            <Link href={`/Admin/ppdb_admin/update_admin/Gambar/${gambar.ppdb_id}`}>
                                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                    <Pencil />
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteGambar(gambar.ppdb_id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

export default HalPertama;
