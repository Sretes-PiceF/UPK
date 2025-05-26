'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

interface InputsType {
    nama_ekstrakulikuler: string;
    pembina: string;
    deskripsi: string;
    url_gambar: string;
}

const Page = () => {
    const params = useParams();
    const ekstrakulikuler_id = params?.ekstrakulikuler_id as string;
    const router = useRouter();

    const [inputs, setInputs] = useState<InputsType>({
        nama_ekstrakulikuler: '',
        pembina: '',
        deskripsi: '',
        url_gambar: ''
    });

    const [fileImage, setFileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEkstrakulikuler = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`);
            setInputs({
                nama_ekstrakulikuler: data.nama_ekstrakulikuler || '',
                pembina: data.pembina || '',
                deskripsi: data.deskripsi || '',
                url_gambar: data.url_gambar || ''
            });
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Gagal memuat data ekstrakurikuler.');
        }
    }, [ekstrakulikuler_id]);

    useEffect(() => {
        if (ekstrakulikuler_id) {
            fetchEkstrakulikuler();
        }
    }, [ekstrakulikuler_id, fetchEkstrakulikuler]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImage(e.target.files[0]);
        }
    };

    const updateEkstrakulikuler = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nama_ekstrakulikuler', inputs.nama_ekstrakulikuler);
        formData.append('pembina', inputs.pembina);
        formData.append('deskripsi', inputs.deskripsi);
        if (fileImage) {
            formData.append('url_gambar', fileImage);
        }

        try {
            await axios.post(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return true;
        } catch (err) {
            console.error('Update error:', err);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const success = await updateEkstrakulikuler();
        if (success) {
            alert('Data berhasil diperbarui!');
            router.push('/Admin/ekstrakulikuler_admin');
        } else {
            setError('Gagal mengupdate data.');
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="w-4/5 p-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Update Ekstrakurikuler</h1>
                    <p className="text-gray-600 mb-6">Silakan update data ekstrakurikuler di bawah ini.</p>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                name="url_gambar"
                                id="url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            <div className="text-center my-4">
                                {fileImage ? (
                                    <Image
                                        src={URL.createObjectURL(fileImage)}
                                        alt="Preview Gambar Baru"
                                        width={200}
                                        height={100}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                ) : inputs.url_gambar ? (
                                    <Image
                                        src={`http://localhost:8000/storage/images/ekstrakulikuler/${inputs.url_gambar}`}
                                        alt="Preview Gambar Lama"
                                        width={200}
                                        height={100}
                                        className="rounded-lg border"
                                        unoptimized
                                    />
                                ) : null}
                            </div>

                            <label className="block text-gray-700 mb-2">Nama Ekstrakurikuler</label>
                            <input
                                type="text"
                                name="nama_ekstrakulikuler"
                                value={inputs.nama_ekstrakulikuler}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Pembina</label>
                            <input
                                type="text"
                                name="pembina"
                                value={inputs.pembina}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                value={inputs.deskripsi}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
