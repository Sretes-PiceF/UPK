'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const { ekstrakulikuler_id } = useParams();
    const router = useRouter();
    const [inputs, setInputs] = useState({
        ekstrakulikuler_judul: '',
        ekstrakulikuler_deskripsi: '',
        ekstrakulikuler_url_gambar: ''
    });
    const [fileImage, setFileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (ekstrakulikuler_id) {
            fetchEkstrakulikuler();
        }
    }, [ekstrakulikuler_id]);

    const fetchEkstrakulikuler = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`);
            setInputs({
                ekstrakulikuler_judul: result.data.ekstrakulikuler_judul || '',
                ekstrakulikuler_deskripsi: result.data.ekstrakulikuler_deskripsi || '',
                ekstrakulikuler_url_gambar: result.data.ekstrakulikuler_url_gambar || ''
            });
        } catch (error) {
            console.error('Error fetching ekstrakulikuler:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const uploadEkstrakulikuler = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('ekstrakulikuler_judul', inputs.ekstrakulikuler_judul);
        formData.append('ekstrakulikuler_deskripsi', inputs.ekstrakulikuler_deskripsi);
        if (fileImage) {
            formData.append('ekstrakulikuler_url_gambar', fileImage);
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Response dari API:", response.data);
            return true;
        } catch (error) {
            console.error('Error updating prestasi:', error);
            return false; // Gagal
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const isSuccess = await uploadEkstrakulikuler();
        if (isSuccess) {
            alert('Data berhasil diupdate!');
            router.push('/Admin/ekstrakulikuler_admin');
        } else {
            alert('Gagal mengupdate data!');
        }
        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="w-4/5 p-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Update Ekstrakulikuler</h1>
                    <p className="text-gray-600 mb-6">Silakan update data ekstrakulikuler di bawah ini.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={(e) => setFileImage(e.target.files[0])}
                                name="ekstrakulikuler_url_gambar"
                                id="ekstrakulikuler_url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {inputs.ekstrakulikuler_url_gambar && (
                                <div className="text-center my-4">
                                    <Image
                                        src={`http://localhost:8000/storage/images/ekstrakulikuler/${inputs.ekstrakulikuler_url_gambar}`}
                                        alt="Ekstrakulikuler Image"
                                        width={200}
                                        height={100}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <label className="block text-gray-700 mb-2">Judul</label>
                            <input
                                type="text"
                                name='ekstrakulikuler_judul'
                                id='ekstrakulikuler_judul'
                                value={inputs.ekstrakulikuler_judul}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                name='ekstrakulikuler_deskripsi'
                                id='ekstrakulikuler_deskripsi'
                                value={inputs.ekstrakulikuler_deskripsi}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            ></textarea>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Page;