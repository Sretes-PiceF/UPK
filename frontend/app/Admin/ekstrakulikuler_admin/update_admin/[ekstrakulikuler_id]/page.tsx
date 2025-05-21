'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const params = useParams();
    const ekstrakulikuler_id = Array.isArray(params?.ekstrakulikuler_id)
        ? params.ekstrakulikuler_id[0]
        : params?.ekstrakulikuler_id ?? '';

    const router = useRouter();

    const [inputs, setInputs] = useState({
        ekstrakulikuler_judul: '',
        ekstrakulikuler_deskripsi: '',
        ekstrakulikuler_url_gambar: ''
    });

    const [fileImage, setFileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (ekstrakulikuler_id) {
            fetchEkstrakulikuler();
        }
    }, [ekstrakulikuler_id]);

    const fetchEkstrakulikuler = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`);
            setInputs({
                ekstrakulikuler_judul: data.ekstrakulikuler_judul || '',
                ekstrakulikuler_deskripsi: data.ekstrakulikuler_deskripsi || '',
                ekstrakulikuler_url_gambar: data.ekstrakulikuler_url_gambar || ''
            });
        } catch (err) {
            console.error('Gagal mengambil data ekstrakulikuler:', err);
            setError('Gagal mengambil data. Silakan coba lagi.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    // Ini fungsi handleSubmit yang sebelumnya belum didefinisikan
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!inputs.ekstrakulikuler_judul.trim() || !inputs.ekstrakulikuler_deskripsi.trim()) {
            setError("Judul dan Deskripsi tidak boleh kosong.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('ekstrakulikuler_judul', inputs.ekstrakulikuler_judul);
        formData.append('ekstrakulikuler_deskripsi', inputs.ekstrakulikuler_deskripsi);
        if (fileImage) {
            formData.append('ekstrakulikuler_url_gambar', fileImage);
        }

        try {
            await axios.post(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Data berhasil diperbarui!');
            router.push('/Admin/ekstrakulikuler_admin');
        } catch (err) {
            console.error('Gagal mengupdate data ekstrakulikuler:', err);
            setError("Gagal mengupdate data. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="w-4/5 p-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Update Ekstrakulikuler</h1>
                    <p className="text-gray-600 mb-6">Silakan update data ekstrakulikuler di bawah ini.</p>

                    {error && (
                        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={(e) => setFileImage(e.target.files ? e.target.files[0] : null)}
                                name="ekstrakulikuler_url_gambar"
                                id="ekstrakulikuler_url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {inputs.ekstrakulikuler_url_gambar && (
                                <div className="text-center my-4">
                                    <Image
                                        src={`http://localhost:8000/storage/images/ekstrakulikuler/${inputs.ekstrakulikuler_url_gambar}`}
                                        alt="Ekstrakulikuler"
                                        width={200}
                                        height={120}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <label className="block text-gray-700 mb-2">Judul</label>
                            <input
                                type="text"
                                name="ekstrakulikuler_judul"
                                id="ekstrakulikuler_judul"
                                value={inputs.ekstrakulikuler_judul}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                name="ekstrakulikuler_deskripsi"
                                id="ekstrakulikuler_deskripsi"
                                value={inputs.ekstrakulikuler_deskripsi}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                                rows={4}
                            ></textarea>

                            <button
                                type="submit"
                                className={`w-full text-white py-2 rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Menyimpan...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Page;
