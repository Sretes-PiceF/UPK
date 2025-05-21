'use client';

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Buat = () => {
    const [juara, setJuara] = useState<string>("");
    const [namasiswa, setNamaSiswa] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const [gambar, setGambar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!juara.trim()) newErrors.juara = "Judul juara tidak boleh kosong";
        if (!namasiswa.trim()) newErrors.namasiswa = "Nama siswa tidak boleh kosong";
        if (!deskripsi.trim()) newErrors.deskripsi = "Deskripsi tidak boleh kosong";
        if (!gambar) newErrors.gambar = "Gambar tidak boleh kosong";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setGambar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("prestasi_juara", juara);
            formData.append("prestasi_namasiswa", namasiswa);
            formData.append("prestasi_deskripsi", deskripsi);
            if (gambar) {
                formData.append("prestasi_url_gambar", gambar);
            }

            await axios.post("http://localhost:8000/api/prestasi", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            router.push("/Admin/prestasi_admin");
        } catch (error) {
            console.error("Error saat menyimpan:", error);
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
                    <h1 className="text-2xl font-bold">Tambah Prestasi</h1>
                    <p className="text-gray-600 mb-6">Silakan isi data prestasi di bawah ini</p>

                    <form onSubmit={onSubmitCreate} className="card p-6 bg-gray-50 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="gambar" className="block text-gray-700 mb-1">Upload Gambar</label>
                            <input
                                type="file"
                                id="gambar"
                                name="prestasi_url_gambar"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleFileChange}
                            />
                            {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>}
                            {preview && (
                                <img src={preview} alt="Preview" className="mt-4 w-40 h-auto rounded border" />
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="prestasi_juara" className="block text-gray-700 mb-1">Judul Juara</label>
                            <input
                                type="text"
                                id="prestasi_juara"
                                name="prestasi_juara"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => setJuara(e.target.value)}
                            />
                            {errors.juara && <p className="text-red-500 text-sm mt-1">{errors.juara}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="prestasi_namasiswa" className="block text-gray-700 mb-1">Nama Siswa</label>
                            <input
                                type="text"
                                id="prestasi_namasiswa"
                                name="prestasi_namasiswa"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => setNamaSiswa(e.target.value)}
                            />
                            {errors.namasiswa && <p className="text-red-500 text-sm mt-1">{errors.namasiswa}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="prestasi_deskripsi" className="block text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                id="prestasi_deskripsi"
                                name="prestasi_deskripsi"
                                className="w-full p-2 border border-gray-300 rounded"
                                rows={3}
                                onChange={(e) => setDeskripsi(e.target.value)}
                            ></textarea>
                            {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Menyimpan...' : 'Buat'}
                        </button>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Buat;
