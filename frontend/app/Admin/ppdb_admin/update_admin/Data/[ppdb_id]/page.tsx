'use client';

import Sidebar from '@/components/Sidebar';
import axios, { AxiosError } from 'axios';
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
    const { ppdb_id } = useParams() as { ppdb_id: string };
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

    // Ambil data dari backend
    useEffect(() => {
        const fetchPpdb = async () => {
            try {
                const response = await axios.get<PPDBData>(`http://localhost:8000/api/ppdb/${ppdb_id}`);
                setInputs({
                    ppdb_deskripsi1: response.data.ppdb_deskripsi1 || '',
                    ppdb_deskripsi2: response.data.ppdb_deskripsi2 || '',
                    ppdb_namaguru_1: response.data.ppdb_namaguru_1 || '',
                    ppdb_namaguru_2: response.data.ppdb_namaguru_2 || '',
                    ppdb_notelp_1: response.data.ppdb_notelp_1 || '',
                    ppdb_notelp_2: response.data.ppdb_notelp_2 || '',
                    ppdb_url_gambar: response.data.ppdb_url_gambar || ''
                });
            } catch (err) {
                const axiosErr = err as AxiosError;
                setError(axiosErr.message || 'Gagal mengambil data');
            }
        };

        if (ppdb_id) fetchPpdb();
    }, [ppdb_id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
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
            formData.append('update_all', 'true');

            if (fileImage) {
                formData.append('ppdb_url_gambar', fileImage);
            }

            await axios.post(`http://localhost:8000/api/ppdb/${ppdb_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Data berhasil diperbarui!');
            router.push('/Admin/ppdb_admin');
        } catch (err) {
            const axiosErr = err as AxiosError<{ message?: string }>;
            setError(
                axiosErr.response?.data?.message || axiosErr.message || 'Gagal update data'
            );
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
                    <p className="text-gray-600 mb-6">Semua data akan diperbarui. Gambar bisa diubah jika diperlukan.</p>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md">
                        {/* Upload Gambar */}
                        <label className="block text-gray-700 mb-2">Upload Gambar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded mb-4"
                        />
                        {/* Input Fields */}
                        {[
                            { label: 'Deskripsi 1', name: 'ppdb_deskripsi1' },
                            { label: 'Deskripsi 2', name: 'ppdb_deskripsi2' },
                            { label: 'Nama Guru 1', name: 'ppdb_namaguru_1' },
                            { label: 'Nama Guru 2', name: 'ppdb_namaguru_2' },
                            { label: 'Nomor Guru 1', name: 'ppdb_notelp_1' },
                            { label: 'Nomor Guru 2', name: 'ppdb_notelp_2' },
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="block text-gray-700 mb-2">{label}</label>
                                <input
                                    type={name.includes('notelp') ? 'tel' : 'text'}
                                    name={name}
                                    value={inputs[name as keyof PPDBData]}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded mb-4"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Memproses...' : 'Update Semua Data'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Page;
