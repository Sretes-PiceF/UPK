'use client'

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ProfileUpdate = () => {
    const { id } = useParams();
    const router = useRouter();

    const [profileUpdate, setProfileUpdate] = useState({
        profile_guru: "",
        profile_siswa: ""
    });

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

    const fetchProfile = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/profile/${id}`);
            setProfileUpdate({
                profile_guru: result.data.profile_guru || "",
                profile_siswa: result.data.profile_siswa || ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    const changeUpdateProfile = (e) => {
        setProfileUpdate({
            ...profileUpdate,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/profile/${id}`, profileUpdate);
            // alert("Success update")
            router.push('/Admin/profile_admin');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">PROFILE</h1>
                    <p className="text-gray-600">Halaman Update Data Profil</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block font-medium">Input Jumlah Data Guru</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200"
                                name="profile_guru"
                                placeholder="Masukkan jumlah guru"
                                value={profileUpdate.profile_guru}
                                onChange={e => changeUpdateProfile(e)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Input Jumlah Data Siswa</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200"
                                name="profile_siswa"
                                placeholder="Masukkan jumlah siswa"
                                value={profileUpdate.profile_siswa}
                                onChange={e => changeUpdateProfile(e)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        onClick={e => onSubmitChange(e)}>
                        Update
                    </button>
                </main>
            </div>
        </>
    );
};

export default ProfileUpdate;