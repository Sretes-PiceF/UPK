'use client';

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

const ProfileUpdate = () => {
    const params = useParams<{ id?: string }>();
    const id = params?.id;
    const router = useRouter();

    const [profileUpdate, setProfileUpdate] = useState({
        profile_guru: "",
        profile_siswa: ""
    });

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { data } = await axios.get(`http://localhost:8000/api/profile/${id}`);
                    setProfileUpdate({
                        profile_guru: data.profile_guru?.toString() || "",
                        profile_siswa: data.profile_siswa?.toString() || ""
                    });
                } catch (error) {
                    console.error("Gagal memuat data profil:", error);
                }
            })();
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileUpdate({
            ...profileUpdate,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/profile/${id}`, profileUpdate);
            router.push("/Admin/profile_admin");
        } catch (error) {
            console.error("Gagal mengupdate profil:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8 bg-white rounded-lg shadow-lg m-4 overflow-auto">
                <h1 className="text-2xl font-bold mb-2">PROFILE</h1>
                <p className="text-gray-600 mb-6">Halaman Update Data Profil</p>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="profile_guru" className="block font-medium">Jumlah Guru</label>
                        <input
                            id="profile_guru"
                            type="number"
                            name="profile_guru"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200"
                            placeholder="Masukkan jumlah guru"
                            value={profileUpdate.profile_guru}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profile_siswa" className="block font-medium">Jumlah Siswa</label>
                        <input
                            id="profile_siswa"
                            type="number"
                            name="profile_siswa"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200"
                            placeholder="Masukkan jumlah siswa"
                            value={profileUpdate.profile_siswa}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-start">
                        <button
                            type="submit"
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ProfileUpdate;
