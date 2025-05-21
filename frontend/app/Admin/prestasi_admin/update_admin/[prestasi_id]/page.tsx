'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InputsType {
    prestasi_juara: string;
    prestasi_namasiswa: string;
    prestasi_deskripsi: string;
    prestasi_url_gambar: string;
}

const Page = () => {
    const params = useParams();
    const prestasi_id = params?.prestasi_id as string;
    const router = useRouter();

    const [inputs, setInputs] = useState<InputsType>({
        prestasi_juara: '',
        prestasi_namasiswa: '',
        prestasi_deskripsi: '',
        prestasi_url_gambar: ''
    });

    const [fileImage, setFileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (prestasi_id) {
            fetchPrestasi();
        }
    }, [prestasi_id]);

    const fetchPrestasi = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/prestasi/${prestasi_id}`);
            setInputs({
                prestasi_juara: data.prestasi_juara || '',
                prestasi_namasiswa: data.prestasi_namasiswa || '',
                prestasi_deskripsi: data.prestasi_deskripsi || '',
                prestasi_url_gambar: data.prestasi_url_gambar || ''
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Gagal memuat data prestasi.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImage(e.target.files[0]);
        }
    };

    const uploadPrestasi = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('prestasi_juara', inputs.prestasi_juara);
        formData.append('prestasi_namasiswa', inputs.prestasi_namasiswa);
        formData.append('prestasi_deskripsi', inputs.prestasi_deskripsi);
        if (fileImage) {
            formData.append('prestasi_url_gambar', fileImage);
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/prestasi/${prestasi_id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Update success:', res.data);
            return true;
        } catch (error) {
            console.error('Update error:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const success = await uploadPrestasi();
        if (success) {
            alert('Data berhasil diperbarui!');
            router.push('/Admin/prestasi_admin');
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
                    <h1 className="text-2xl font-bold mb-2">Update Prestasi</h1>
                    <p className="text-gray-600 mb-6">Silakan update data prestasi di bawah ini.</p>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <label className="block text-gray-700 mb-2">Upload Gambar</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                name="prestasi_url_gambar"
                                id="prestasi_url_gambar"
                                className="w-full p-2 border rounded mb-4"
                            />

                            {inputs.prestasi_url_gambar && (
                                <div className="text-center my-4">
                                    <Image
                                        src={`http://localhost:8000/storage/images/prestasi/${inputs.prestasi_url_gambar}`}
                                        alt="Preview Gambar"
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
                                value={inputs.prestasi_juara}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Nama Siswa</label>
                            <input
                                type="text"
                                name="prestasi_namasiswa"
                                value={inputs.prestasi_namasiswa}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-4"
                            />

                            <label className="block text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                name="prestasi_deskripsi"
                                value={inputs.prestasi_deskripsi}
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
