'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const { ppdb_id } = useParams();
    const router = useRouter();
    const [inputs, setInputs] = useState({
        ppdb_deskripsi1: '',
        ppdb_deskripsi2: '',
        ppdb_namaguru_1: '',
        ppdb_namaguru_2: '',
        ppdb_notelp_1: '',
        ppdb_notelp_2: '',
        ppdb_url_gambar: ''
    });
    const [fileImage, setFileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ambil data awal dari backend
    useEffect(() => {
        const fetchPpdb = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/ppdb/${ppdb_id}`);
                setInputs({
                    ppdb_deskripsi1: result.data.ppdb_deskripsi1 || '',
                    ppdb_deskripsi2: result.data.ppdb_deskripsi2 || '',
                    ppdb_namaguru_1: result.data.ppdb_namaguru_1 || '',
                    ppdb_namaguru_2: result.data.ppdb_namaguru_2 || '',
                    ppdb_notelp_1: result.data.ppdb_notelp_1 || '',
                    ppdb_notelp_2: result.data.ppdb_notelp_2 || '',
                    ppdb_url_gambar: result.data.ppdb_url_gambar || ''
                });
            } catch (error) {
                console.error('Error fetching ppdb:', error);
            }
        };

        fetchPpdb();
    }, [ppdb_id]);

    // Handle perubahan input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    // Handle perubahan file gambar
    const handleImageChange = (event) => {
        setFileImage(event.target.files[0]);
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('ppdb_deskripsi1', inputs.ppdb_deskripsi1);
            formData.append('ppdb_deskripsi2', inputs.ppdb_deskripsi2);
            formData.append('ppdb_namaguru_1', inputs.ppdb_namaguru_1);
            formData.append('ppdb_namaguru_2', inputs.ppdb_namaguru_2);
            formData.append('ppdb_notelp_1', inputs.ppdb_notelp_1);
            formData.append('ppdb_notelp_2', inputs.ppdb_notelp_2);
            formData.append('update_all', 'true'); // Kirim perintah untuk update semua data

            if (fileImage) {
                formData.append('ppdb_url_gambar', fileImage);
            }

            console.log("Data yang dikirim:", [...formData.entries()]); // Debugging

            await axios.post(`http://localhost:8000/api/ppdb/${ppdb_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Semua data berhasil diperbarui!');
            router.push('/Admin/ppdb_admin');
        } catch (error) {
            console.error('Error updating data:', error.response || error);
            setError('Gagal mengupdate data: ' + (error.response?.data?.error || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="w-4/5 p-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Update PPDB</h1>
                    <p className="text-gray-600 mb-6">Semua data akan diperbarui kecuali gambar.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">

                            <label className="block text-gray-700 mb-2">Deskripsi 1</label>
                            <input
                                type="text"
                                name="ppdb_deskripsi1"
                                value={inputs.ppdb_deskripsi1}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi 2</label>
                            <input
                                type="text"
                                name="ppdb_deskripsi2"
                                value={inputs.ppdb_deskripsi2}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 1</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_1"
                                value={inputs.ppdb_namaguru_1}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 2</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_2"
                                value={inputs.ppdb_namaguru_2}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 1</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_1"
                                value={inputs.ppdb_notelp_1}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 2</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_2"
                                value={inputs.ppdb_notelp_2}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Memproses...' : 'Update Semua Data'}
                            </button>

                            {error && <p className="mt-4 text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Page;