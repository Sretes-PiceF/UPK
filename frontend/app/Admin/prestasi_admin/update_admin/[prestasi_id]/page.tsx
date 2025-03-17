'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'; // Tambahkan useRouter untuk redirect
import { useEffect, useState } from 'react';

const Page = () => {
    const { prestasi_id } = useParams();
    const router = useRouter(); // Inisialisasi useRouter
    const [inputs, setInputs] = useState({
        prestasi_juara: '',
        prestasi_namasiswa: '',
        prestasi_deskripsi: '',
        prestasi_url_gambar: ''
    });
    const [fileImage, setFileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (prestasi_id) {
            fetchPrestasi();
        }
    }, [prestasi_id]);

    const fetchPrestasi = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/prestasi/${prestasi_id}`);
            setInputs({
                prestasi_juara: result.data.prestasi_juara || '',
                prestasi_namasiswa: result.data.prestasi_namasiswa || '',
                prestasi_deskripsi: result.data.prestasi_deskripsi || '',
                prestasi_url_gambar: result.data.prestasi_url_gambar || ''
            });
        } catch (error) {
            console.error('Error fetching prestasi:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const uploadPrestasi = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Untuk method PUT di Laravel
        formData.append('prestasi_juara', inputs.prestasi_juara);
        formData.append('prestasi_namasiswa', inputs.prestasi_namasiswa);
        formData.append('prestasi_deskripsi', inputs.prestasi_deskripsi);
        if (fileImage) {
            formData.append('prestasi_url_gambar', fileImage); // Sesuaikan dengan field yang diharapkan backend
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/prestasi/${prestasi_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Response dari API:", response.data);
            return true; // Berhasil
        } catch (error) {
            console.error('Error updating prestasi:', error);
            return false; // Gagal
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const isSuccess = await uploadPrestasi();
        if (isSuccess) {
            alert('Data berhasil diupdate!');
            router.push('/Admin/prestasi_admin'); // Redirect ke halaman /Admin/prestasi_admin
        } else {
            alert('Gagal mengupdate data!');
        }

        setIsLoading(false)
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="w-4/5 p-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Update Prestasi</h1>
                    <p className="text-gray-600 mb-6">Silakan update data prestasi di bawah ini.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={(e) => setFileImage(e.target.files[0])} // Perbaiki sintaks
                                name="prestasi_url_gambar"
                                id="prestasi_url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {inputs.prestasi_url_gambar && (
                                <div className="text-center my-4">
                                    <Image
                                        src={`http://localhost:8000/storage/images/prestasi/${inputs.prestasi_url_gambar}`}
                                        alt="Prestasi Image"
                                        width={200}
                                        height={100}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <label className="block text-gray-700 mb-2">Judul Juara</label>
                            <input
                                type="text"
                                name="prestasi_juara"
                                id='prestasi_juara'
                                value={inputs.prestasi_juara}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nama Siswa</label>
                            <input
                                type="text"
                                name="prestasi_namasiswa"
                                id='prestasi_namasiswa'
                                value={inputs.prestasi_namasiswa}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                name="prestasi_deskripsi"
                                id='prestasi_deskripsi'
                                value={inputs.prestasi_deskripsi}
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