'use client'

import Sidebar from "@/components/Sidebar"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

const Buat = () => {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState(null);
    const router = useRouter();

    const onSubmitCreate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()
            formData.append("ekstrakulikuler_judul", judul);
            formData.append("ekstrakulikuler_deskripsi", deskripsi);
            formData.append("ekstrakulikuler_url_gambar", gambar);

            const response = await axios.post('http://localhost:8000/api/ekstrakulikuler', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            router.push("/Admin/ekstrakulikuler_admin");
        } catch (error) {
            console.log("Something error", error);
        }
    }
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">EKSTRAKULIKULER</h1>
                    <p className="text-gray-600">Halaman Buat Data Ekstrakulikuler</p>
                    <form onSubmit={onSubmitCreate} className="card p-4 bg-gray-50 rounded-lg shadow">
                        <div className="card p-4 bg-gray-50 rounded-lg shadow">
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input data images</label>
                                <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setGambar(e.target.files[0])} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input Judul</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ekstrakulikuler_judul" id="ekstrakulikuler_judul" onChange={(e) => setJudul(e.target.value)} />
                            </div>
                            <div className="input-container mb-4">
                                <label className="block text-gray-700">Input Deskripsi</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" name="ekstrakulkuler_deskripsi" id="ekstrakulikuler_deskripsi" onChange={(e) => setDeskripsi(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Buat</button>
                        <p id="status" className="mt-4 text-green-600 font-medium"></p>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Buat