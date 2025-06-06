'use client';

import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";

interface Prestasi {
    prestasi_id: number;
    prestasi_juara: string;
    prestasi_namasiswa: string;
    prestasi_deskripsi: string;
    prestasi_url_gambar: string;
}

const HalPertama = () => {
    const [prestasiData, setPrestasiData] = useState<Prestasi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await axios.get("http://localhost:8000/api/prestasi");
            if (result.data && Array.isArray(result.data.data)) {
                setPrestasiData(result.data.data);
            } else {
                setError("Data tidak tersedia");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    };

    const deletePrestasi = async (prestasi_id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/prestasi/${prestasi_id}`);
            setPrestasiData(prev => prev.filter(item => item.prestasi_id !== prestasi_id));
            alert("Sukses menghapus data.");
        } catch (error) {
            console.error("Gagal menghapus:", error);
            alert("Gagal menghapus data.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className=" w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold mb-2">Prestasi</h1>
                    <p className="text-gray-600 mb-4">Halaman Update Data Prestasi</p>
                    <Link href="/Admin/prestasi_admin/store_admin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                            Tambah Data
                        </button>
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200 text-left" >
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
                                    <tr key={rs.prestasi_id}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{rs.prestasi_juara}</td>
                                        <td className="px-4 py-2 border">{rs.prestasi_namasiswa}</td>
                                        <td className="px-4 py-2 border">{rs.prestasi_deskripsi}</td>
                                        <td className="px-4 py-2 border">
                                            {rs.prestasi_url_gambar ? (
                                                <Image
                                                    src={`http://localhost:8000/storage/images/prestasi/${rs.prestasi_url_gambar}`}
                                                    alt={rs.prestasi_juara}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-sm text-gray-500">Tidak ada gambar</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex space-x-2">
                                                <Link href={`/Admin/prestasi_admin/update_admin/${rs.prestasi_id}`}>
                                                    <button className="bg-yellow-500 text-white px-2 py-2 rounded-md hover:bg-yellow-700">
                                                        <Pencil size={16} />
                                                    </button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-700">
                                                            <Trash size={16} />
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deletePrestasi(rs.prestasi_id)}>
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
    );
};

export default HalPertama;
