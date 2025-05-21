'use client';

import Sidebar from '@/components/Sidebar';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface PPDBData {
    ppdb_deskripsi1: string;
    ppdb_deskripsi2: string;
    ppdb_namaguru_1: string;
    ppdb_namaguru_2: string;
    ppdb_notelp_1: string;
    ppdb_notelp_2: string;
    ppdb_url_gambar: string;
}

const Page = () => {
    const params = useParams();
    const ppdb_id = params?.ppdb_id as string;
    const router = useRouter();
    const [inputs, setInputs] = useState<PPDBData>({
        ppdb_deskripsi1: '',
        ppdb_deskripsi2: '',
        ppdb_namaguru_1: '',
        ppdb_namaguru_2: '',
        ppdb_notelp_1: '',
        ppdb_notelp_2: '',
        ppdb_url_gambar: ''
    });
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFirstData, setIsFirstData] = useState(false);

    // Ambil data yang sedang diupdate
    useEffect(() => {
        const fetchPpdb = async () => {
            try {
                const result = await axios.get<PPDBData>(`http://localhost:8000/api/ppdb/${ppdb_id}`);

                if (result.data) {
                    setInputs({
                        ppdb_deskripsi1: result.data.ppdb_deskripsi1 || '',
                        ppdb_deskripsi2: result.data.ppdb_deskripsi2 || '',
                        ppdb_namaguru_1: result.data.ppdb_namaguru_1 || '',
                        ppdb_namaguru_2: result.data.ppdb_namaguru_2 || '',
                        ppdb_notelp_1: result.data.ppdb_notelp_1 || '',
                        ppdb_notelp_2: result.data.ppdb_notelp_2 || '',
                        ppdb_url_gambar: result.data.ppdb_url_gambar || ''
                    });

                    setIsFirstData(ppdb_id === '1');
                }
            } catch (error) {
                console.error('Error fetching ppdb:', error);
                setError('Gagal memuat data PPDB');
            }
        };

        if (ppdb_id) {
            fetchPpdb();
        }
    }, [ppdb_id]);

    // Handle perubahan input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    // Handle perubahan file gambar
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImage(e.target.files[0]);
        }
    };

    // Handle submit form
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');

            // Tambahkan semua field ke formData
            formData.append('ppdb_deskripsi1', inputs.ppdb_deskripsi1);
            formData.append('ppdb_deskripsi2', inputs.ppdb_deskripsi2);
            formData.append('ppdb_namaguru_1', inputs.ppdb_namaguru_1);
            formData.append('ppdb_namaguru_2', inputs.ppdb_namaguru_2);
            formData.append('ppdb_notelp_1', inputs.ppdb_notelp_1);
            formData.append('ppdb_notelp_2', inputs.ppdb_notelp_2);

            if (fileImage) {
                formData.append('ppdb_url_gambar', fileImage);
            }

            await axios.post(`http://localhost:8000/api/ppdb/${ppdb_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Data berhasil diupdate!');
            router.push('/Admin/ppdb_admin');
        } catch (error) {
            console.error('Error updating data:', error);
            const axiosError = error as AxiosError<{ message?: string }>;
            setError(`Gagal mengupdate data: ${axiosError.response?.data?.message || axiosError.message}`);
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

                    {error && !isLoading && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                name="ppdb_url_gambar"
                                id="ppdb_url_gambar"
                                accept="image/*"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {(inputs.ppdb_url_gambar || fileImage) && (
                                <div className="text-center my-4">
                                    <Image
                                        src={
                                            fileImage
                                                ? URL.createObjectURL(fileImage)
                                                : `http://localhost:8000/storage/images/ppdb/${inputs.ppdb_url_gambar}`
                                        }
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
                                id="ppdb_deskripsi1"
                                value={inputs.ppdb_deskripsi1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                                required
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi 2</label>
                            <input
                                type="text"
                                name="ppdb_deskripsi2"
                                id="ppdb_deskripsi2"
                                value={inputs.ppdb_deskripsi2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 1</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_1"
                                id="ppdb_namaguru_1"
                                value={inputs.ppdb_namaguru_1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                                required
                            />

                            <label className="block text-gray-700 mb-2">Nama Guru 2</label>
                            <input
                                type="text"
                                name="ppdb_namaguru_2"
                                id="ppdb_namaguru_2"
                                value={inputs.ppdb_namaguru_2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 1</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_1"
                                id="ppdb_notelp_1"
                                value={inputs.ppdb_notelp_1}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                                required
                                pattern="[0-9]*"
                            />

                            <label className="block text-gray-700 mb-2">Nomor Guru 2</label>
                            <input
                                type="tel"
                                name="ppdb_notelp_2"
                                id="ppdb_notelp_2"
                                value={inputs.ppdb_notelp_2}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                disabled={!isFirstData}
                                pattern="[0-9]*"
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Memproses...' : 'Update Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Page;