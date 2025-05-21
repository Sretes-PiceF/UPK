'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PpdbData {
    ppdb_deskripsi1: string;
    ppdb_deskripsi2: string;
    ppdb_namaguru_1: string;
    ppdb_namaguru_2: string;
    ppdb_notelp_1: string;
    ppdb_notelp_2: string;
    ppdb_url_gambar: string;
}

const Page = () => {
    const params = useParams() as { ppdb_id: string };
    const router = useRouter();
    const ppdb_id = Array.isArray(params.ppdb_id) ? params.ppdb_id[0] : params.ppdb_id;

    const [inputs, setInputs] = useState<PpdbData>({
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

    useEffect(() => {
        const fetchPpdb = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/ppdb/${ppdb_id}`);
                const data = result.data;
                setInputs({
                    ppdb_deskripsi1: data.ppdb_deskripsi1 || '',
                    ppdb_deskripsi2: data.ppdb_deskripsi2 || '',
                    ppdb_namaguru_1: data.ppdb_namaguru_1 || '',
                    ppdb_namaguru_2: data.ppdb_namaguru_2 || '',
                    ppdb_notelp_1: data.ppdb_notelp_1 || '',
                    ppdb_notelp_2: data.ppdb_notelp_2 || '',
                    ppdb_url_gambar: data.ppdb_url_gambar || ''
                });

                if (ppdb_id === '1') {
                    setIsFirstData(true);
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    console.error('Error fetching ppdb:', err.response);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        };

        if (ppdb_id) fetchPpdb();
    }, [ppdb_id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');

            if (fileImage) {
                formData.append('ppdb_url_gambar', fileImage);
            } else {
                formData.append('ppdb_deskripsi1', inputs.ppdb_deskripsi1);
                formData.append('ppdb_deskripsi2', inputs.ppdb_deskripsi2);
                formData.append('ppdb_namaguru_1', inputs.ppdb_namaguru_1);
                formData.append('ppdb_namaguru_2', inputs.ppdb_namaguru_2);
                formData.append('ppdb_notelp_1', inputs.ppdb_notelp_1);
                formData.append('ppdb_notelp_2', inputs.ppdb_notelp_2);
            }

            await axios.post(`http://localhost:8000/api/ppdb/${ppdb_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Data berhasil diupdate!');
            router.push('/Admin/ppdb_admin');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error('Error updating data:', err.response);
                setError('Gagal mengupdate data: ' + (err.response?.data?.error || err.message));
            } else {
                console.error('Unexpected error:', err);
                setError('Terjadi kesalahan tidak diketahui');
            }
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
                                onChange={(e) => setFileImage(e.target.files?.[0] ?? null)}
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

                            {/* Form Fields */}
                            {[
                                { label: 'Deskripsi 1', name: 'ppdb_deskripsi1' },
                                { label: 'Deskripsi 2', name: 'ppdb_deskripsi2' },
                                { label: 'Nama Guru 1', name: 'ppdb_namaguru_1' },
                                { label: 'Nama Guru 2', name: 'ppdb_namaguru_2' },
                                { label: 'Nomor Guru 1', name: 'ppdb_notelp_1', type: 'tel' },
                                { label: 'Nomor Guru 2', name: 'ppdb_notelp_2', type: 'tel' },
                            ].map(({ label, name, type = 'text' }) => (
                                <div key={name}>
                                    <label className="block text-gray-700 mb-2">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        value={inputs[name as keyof PpdbData]}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded mb-4 ${!isFirstData ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                        disabled={!isFirstData}
                                    />
                                </div>
                            ))}

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
