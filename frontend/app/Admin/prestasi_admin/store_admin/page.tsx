'use client';

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Buat = () => {
    const [formData, setFormData] = useState({
        juara: '',
        namasiswa: '',
        deskripsi: ''
    });
    const [gambar, setGambar] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.juara.trim()) newErrors.juara = "Judul juara tidak boleh kosong";
        if (!formData.namasiswa.trim()) newErrors.namasiswa = "Nama siswa tidak boleh kosong";
        if (!formData.deskripsi.trim()) newErrors.deskripsi = "Deskripsi tidak boleh kosong";
        if (!gambar) newErrors.gambar = "Gambar tidak boleh kosong";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setGambar(file);
    };

    const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const payload = new FormData();
            payload.append("prestasi_juara", formData.juara);
            payload.append("prestasi_namasiswa", formData.namasiswa);
            payload.append("prestasi_deskripsi", formData.deskripsi);
            if (gambar) payload.append("prestasi_url_gambar", gambar);

            await axios.post("http://localhost:8000/api/prestasi", payload, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            router.push("/Admin/prestasi_admin");
        } catch (error) {
            console.error("Gagal menyimpan:", error);
            alert("Terjadi kesalahan saat menyimpan data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold mb-2">Tambah Prestasi</h1>
                    <p className="text-gray-600 mb-6">Silakan isi data prestasi di bawah ini</p>

                    <form onSubmit={onSubmitCreate} className="p-6 bg-gray-50 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="gambar" className="block text-gray-700 mb-1 font-medium">Upload Gambar</label>
                            <input
                                type="file"
                                id="gambar"
                                name="gambar"
                                className="w-full p-2 border border-gray-300 rounded"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {errors.gambar && <p className="text-red-500 text-sm">{errors.gambar}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="juara" className="block text-gray-700 mb-1 font-medium">Judul Juara</label>
                            <input
                                type="text"
                                id="juara"
                                name="juara"
                                value={formData.juara}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.juara && <p className="text-red-500 text-sm">{errors.juara}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="namasiswa" className="block text-gray-700 mb-1 font-medium">Nama Siswa</label>
                            <input
                                type="text"
                                id="namasiswa"
                                name="namasiswa"
                                value={formData.namasiswa}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.namasiswa && <p className="text-red-500 text-sm">{errors.namasiswa}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="deskripsi" className="block text-gray-700 mb-1 font-medium">Deskripsi</label>
                            <textarea
                                id="deskripsi"
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                rows={3}
                            ></textarea>
                            {errors.deskripsi && <p className="text-red-500 text-sm">{errors.deskripsi}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? "Menyimpan..." : "Buat"}
                        </button>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Buat;
