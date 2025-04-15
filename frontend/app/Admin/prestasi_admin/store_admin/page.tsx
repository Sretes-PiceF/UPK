'use client'

import Sidebar from "@/components/Sidebar"
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Buat = () => {
    const [juara, setJuara] = useState("");
    const [namasiswa, setNamaSiswa] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState(null);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateForm = () => {
        const newErrors = {};
        if (!juara.trim()) newErrors.juara = "Judul juara tidak boleh kosong";
        if (!namasiswa.trim()) newErrors.namasiswa = "Nama siswa tidak boleh kosong";
        if (!deskripsi.trim()) newErrors.deskripsi = "Deskripsi tidak boleh kosong";
        if (!gambar) newErrors.gambar = "Gambar tidak boleh kosong";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitCreate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData()
            formData.append("prestasi_juara", juara);
            formData.append("prestasi_namasiswa", namasiswa);
            formData.append("prestasi_deskripsi", deskripsi);
            formData.append("prestasi_url_gambar", gambar);

            const response = await axios.post('http://localhost:8000/api/prestasi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            router.push("/Admin/prestasi_admin");
        } catch (error) {
            console.log("Something error", error);
        }
    }

    return (
        <>
            <ProtectedRoute>
                <div className="flex h-screen bg-gray-100">
                    <Sidebar />
                    <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                        <h1 className="text-2xl font-bold">PRESTASI</h1>
                        <p className="text-gray-600">Selamat Datang di Halaman Tambah Data Prestasi</p>
                        <form onSubmit={onSubmitCreate} className="card p-4 bg-gray-50 rounded-lg shadow">
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input data images</label>
                                <input
                                    type="file"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setGambar(e.target.files[0])}
                                />
                                {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>}
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input judul juara</label>
                                <input
                                    type="text"
                                    name="prestasi_juara"
                                    id="prestasi_juara"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setJuara(e.target.value)}
                                />
                                {errors.juara && <p className="text-red-500 text-sm mt-1">{errors.juara}</p>}
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input nama siswa</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setNamaSiswa(e.target.value)}
                                />
                                {errors.namasiswa && <p className="text-red-500 text-sm mt-1">{errors.namasiswa}</p>}
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input deskripsi</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                />
                                {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
                            </div>
                            <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Buat</button>
                            <p id="status" className="mt-4 text-green-600 font-medium"></p>
                        </form>
                    </main>
                </div>
            </ProtectedRoute>
        </>
    )
}

export default Buat