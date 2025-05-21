'use client'

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormErrors = {
    judul?: string;
    deskripsi?: string;
    gambar?: string;
    submit?: string;
};

const Buat = () => {
    const [judul, setJudul] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const [gambar, setGambar] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!judul.trim()) newErrors.judul = "Judul harus diisi";
        if (!deskripsi.trim()) newErrors.deskripsi = "Deskripsi harus diisi";
        if (!gambar) newErrors.gambar = "Gambar harus dipilih";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formData = new FormData();
            formData.append("ekstrakulikuler_judul", judul);
            formData.append("ekstrakulikuler_deskripsi", deskripsi);
            if (gambar) formData.append("ekstrakulikuler_url_gambar", gambar);

            await axios.post("http://localhost:8000/api/ekstrakulikuler", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Data berhasil ditambahkan!");
            router.push("/Admin/ekstrakulikuler_admin");
        } catch (error) {
            console.error("Terjadi kesalahan saat mengirim data:", error);
            setErrors({ ...errors, submit: "Terjadi kesalahan saat mengirim data" });
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold mb-2">EKSTRAKULIKULER</h1>
                    <p className="text-gray-600 mb-6">Halaman Buat Data Ekstrakulikuler</p>

                    {errors.submit && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={onSubmitCreate} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-1">Upload Gambar</label>
                            <input
                                type="file"
                                className={`w-full p-2 border ${errors.gambar ? 'border-red-500' : 'border-gray-300'} rounded`}
                                onChange={(e) => setGambar(e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.gambar && (
                                <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Judul</label>
                            <input
                                type="text"
                                name="ekstrakulikuler_judul"
                                id="ekstrakulikuler_judul"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                className={`w-full p-2 border ${errors.judul ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors.judul && (
                                <p className="text-red-500 text-sm mt-1">{errors.judul}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Deskripsi</label>
                            <input
                                type="text"
                                name="ekstrakulikuler_deskripsi"
                                id="ekstrakulikuler_deskripsi"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                className={`w-full p-2 border ${errors.deskripsi ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors.deskripsi && (
                                <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            Buat
                        </button>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Buat;
