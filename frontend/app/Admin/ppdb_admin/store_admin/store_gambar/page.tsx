'use client'

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Buat = () => {
    const [gambar, setGambar] = useState(null);
    const [firstData, setFirstData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Ambil data pertama saat komponen dimuat
        const fetchFirstData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ppdb');
                if (response.data && response.data.data.length > 0) {
                    setFirstData(response.data.data[0]);
                }
            } catch (error) {
                console.error("Gagal mengambil data pertama", error);
            }
        };

        fetchFirstData();
    }, []);

    const onSubmitCreate = async (e) => {
        e.preventDefault();

        if (!firstData) {
            alert("Data pertama belum tersedia. Silakan tambahkan data pertama terlebih dahulu.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("ppdb_url_gambar", gambar);
            formData.append("ppdb_deskripsi1", firstData.ppdb_deskripsi1);
            formData.append("ppdb_deskripsi2", firstData.ppdb_deskripsi2);
            formData.append("ppdb_namaguru_1", firstData.ppdb_namaguru_1);
            formData.append("ppdb_namaguru_2", firstData.ppdb_namaguru_2);
            formData.append("ppdb_notelp_1", firstData.ppdb_notelp_1);
            formData.append("ppdb_notelp_2", firstData.ppdb_notelp_2);

            const response = await axios.post('http://localhost:8000/api/ppdb', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            router.push("/Admin/ppdb_admin");
        } catch (error) {
            console.log("Something error", error);
        }
    };

    return (
        <>
            <ProtectedRoute>
                <div className="flex h-screen bg-gray-100">
                    <Sidebar />
                    <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                        <h1 className="text-2xl font-bold">PPDB</h1>
                        <p className="text-gray-600">Selamat Datang di Halaman Tambah Data PPDB</p>
                        <form onSubmit={onSubmitCreate} className="card p-4 bg-gray-50 rounded-lg shadow">
                            <div className="card p-4 bg-gray-50 rounded-lg shadow">
                                <div className="input-container mb-4">
                                    <label className="block text-gray-700">Input data images</label>
                                    <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setGambar(e.target.files[0])} />
                                </div>
                            </div>
                            <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Buat</button>
                        </form>
                        <p className="mt-4 text-green-600 font-medium"></p>
                    </main>
                </div>
            </ProtectedRoute>
        </>
    )
}

export default Buat;