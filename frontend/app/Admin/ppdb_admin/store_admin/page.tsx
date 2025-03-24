'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

const Buat = () => {
    const [deskripsi1, setDeskripsi1] = useState("");
    const [deskripsi2, setDeskripsi2] = useState("");
    const [namaguru_1, setGuru1] = useState("");
    const [namaguru_2, setGuru2] = useState("");
    const [notelp_1, setNotelp1] = useState("");
    const [notelp_2, setNotelp2] = useState("");
    const [gambar, setGambar] = useState(null);
    const router = useRouter();

    const onSubmitCreate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("ppdb_deskripsi1", deskripsi1);
            formData.append("ppdb_deskripsi2", deskripsi2);
            formData.append("ppdb_namaguru_1", namaguru_1);
            formData.append("ppdb_namaguru_2", namaguru_2);
            formData.append("ppdb_notelp_1", notelp_1);
            formData.append("ppdb_notelp_2", notelp_2);
            formData.append("ppdb_url_gambar", gambar);

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
                <div className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                        <h1 className="text-2xl font-bold">PPDB</h1>
                        <p className="text-gray-600">Selamat Datang di Halaman Tambah Data PPDB</p>
                        <form onSubmit={onSubmitCreate} className="card p-4 bg-gray-50 rounded-lg shadow">
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input data images</label>
                                <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setGambar(e.target.files[0])} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input deskripsi 1</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ppdb_deskripsi1" id="ppdb_deskripsi1" onChange={(e) => setDeskripsi1(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input deskripsi 2</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ppdb_deskripsi2" id="ppdb_deskripsi2" onChange={(e) => setDeskripsi2(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input nama guru 1</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ppdb_namaguru_1" id="ppdb_namaguru_1" onChange={(e) => setGuru1(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input nama guru 2</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ppdb_namaguru_2" id="ppdb_namaguru_2" onChange={(e) => setGuru2(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input nomor guru 1</label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded" name="ppdb_notelp_1" id="ppdb_notelp_1" onChange={(e) => setNotelp1(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input nomor guru 2</label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded" name="ppdb_notelp_2" id="ppdb_notelp_2" onChange={(e) => setNotelp2(e.target.value)} />
                            </div>
                            <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Buat</button>
                        </form>
                    </main>
                </div>
            </ProtectedRoute>
        </>
    );
};

export default Buat;