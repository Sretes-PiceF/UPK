'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const Buat = () => {
    interface PpdbData {
        ppdb_deskripsi1?: string;
        ppdb_deskripsi2?: string;
        ppdb_namaguru_1?: string;
        ppdb_namaguru_2?: string;
        ppdb_notelp_1?: string;
        ppdb_notelp_2?: string;
    }
    const [firstData, setFirstData] = useState<PpdbData | null>(null);
    const [gambar, setGambar] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchFirstData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ppdb');
                if (response.data?.data?.length > 0) {
                    setFirstData(response.data.data[0]);
                }
            } catch (error) {
                console.error("Gagal mengambil data", error);
                setErrors(prev => ({ ...prev, fetch: "Gagal memuat data dasar. Silakan coba lagi." }));
            }
        };

        fetchFirstData();
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!gambar) newErrors.gambar = "Gambar harus dipilih";
        if (!firstData) newErrors.data = "Data dasar belum tersedia.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("ppdb_url_gambar", gambar!);
            formData.append("ppdb_deskripsi1", firstData!.ppdb_deskripsi1 ?? '');
            formData.append("ppdb_deskripsi2", firstData!.ppdb_deskripsi2 ?? '');
            formData.append("ppdb_namaguru_1", firstData!.ppdb_namaguru_1 ?? '');
            formData.append("ppdb_namaguru_2", firstData!.ppdb_namaguru_2 ?? '');
            formData.append("ppdb_notelp_1", firstData!.ppdb_notelp_1 ?? '');
            formData.append("ppdb_notelp_2", firstData!.ppdb_notelp_2 ?? '');

            const token = localStorage.getItem('access_token');

            await axios.post('http://localhost:8000/api/ppdb', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` }),
                }
            });

            router.push("/Admin/ppdb_admin");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Terjadi kesalahan saat mengirim data.";
                console.error("Upload error:", error);
                setErrors(prev => ({ ...prev, submit: message }));
            } else {
                setErrors(prev => ({ ...prev, submit: "Terjadi kesalahan yang tidak diketahui." }));
            }
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">PPDB</h1>
                    <p className="text-gray-600">Selamat Datang di Halaman Tambah Data PPDB</p>

                    {(errors.fetch || errors.submit || errors.data) && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {errors.fetch || errors.submit || errors.data}
                        </div>
                    )}

                    <form onSubmit={onSubmitCreate} className="p-4 bg-gray-50 rounded-lg shadow">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                className={`w-full p-2 border ${errors.gambar ? 'border-red-500' : 'border-gray-300'} rounded`}
                                onChange={(e) => setGambar(e.target.files?.[0] || null)}
                            />
                            {errors.gambar && (
                                <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Memproses...' : 'Buat'}
                        </button>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Buat;
