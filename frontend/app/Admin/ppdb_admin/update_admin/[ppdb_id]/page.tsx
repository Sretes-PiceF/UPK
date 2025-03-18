'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
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
    const [isFirstData, setIsFirstData] = useState(false); // State untuk mengecek apakah data pertama

    // Ambil data yang sedang diupdate
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

                // Cek apakah data pertama (misalnya, ppdb_id = 1)
                if (ppdb_id == 1) {
                    setIsFirstData(true);
                }
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

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT'); // Untuk metode PUT

            // Jika hanya ingin mengupdate gambar, kirim hanya field gambar
            if (fileImage) {
                formData.append('ppdb_url_gambar', fileImage);
            } else {
                // Jika tidak ada gambar yang diupload, kirim semua field yang diperlukan
                formData.append('ppdb_deskripsi1', inputs.ppdb_deskripsi1);
                formData.append('ppdb_deskripsi2', inputs.ppdb_deskripsi2);
                formData.append('ppdb_namaguru_1', inputs.ppdb_namaguru_1);
                formData.append('ppdb_namaguru_2', inputs.ppdb_namaguru_2);
                formData.append('ppdb_notelp_1', inputs.ppdb_notelp_1);
                formData.append('ppdb_notelp_2', inputs.ppdb_notelp_2);
            }

            // Debugging: Lihat data yang dikirim
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // Kirim update ke backend
            await axios.post(`http://localhost:8000/api/ppdb/${ppdb_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Data berhasil diupdate!');
            router.push('/Admin/ppdb_admin'); // Redirect ke halaman /Admin/ppdb_admin
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
                    <p className="text-gray-600 mb-6">Silakan update data PPDB di bawah ini.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={(e) => setFileImage(e.target.files[0])}
                                name="ppdb_url_gambar"
                                id="ppdb_url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {inputs.ppdb_url_gambar && (
                                <div className="text-center my-4">
                                    <Image
                                        src={`http://localhost:8000/storage/images/ppdb/${inputs.ppdb_url_gambar}`}
                                        alt="PPDB Image"
                                        width={200}
                                        height={100}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <label className="block text-gray-700 mb-2">Deskripsi 1</label>
                            <input
                                type="text"
                                name="ppdb_deskripsi1"
                                id='ppdb_deskripsi1'
                                value={inputs.ppdb_deskripsi1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi 2</label>
                            <input
                                type="text"
                                name="ppdb_deskripsi2"
                                id='ppdb_deskripsi2'
                                value={inputs.ppdb_deskripsi2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 1</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_1"
                                id='ppdb_namaguru_1'
                                value={inputs.ppdb_namaguru_1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 2</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_2"
                                id='ppdb_namaguru_2'
                                value={inputs.ppdb_namaguru_2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 1</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_1"
                                id='ppdb_notelp_1'
                                value={inputs.ppdb_notelp_1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 2</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_2"
                                id='ppdb_notelp_2'
                                value={inputs.ppdb_notelp_2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Memproses...' : 'Update Data'}
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