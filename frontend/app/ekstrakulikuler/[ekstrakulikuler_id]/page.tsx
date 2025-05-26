'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface Ekstrakulikuler {
    ekstrakulikuler_judul: string;
    ekstrakulikuler_deskripsi: string;
    ekstrakulikuler_url_gambar: string;
}

const EkstrakulikulerDetail = () => {
    const params = useParams();
    const ekstrakulikuler_id = Array.isArray(params?.ekstrakulikuler_id)
        ? params.ekstrakulikuler_id[0]
        : params?.ekstrakulikuler_id || '';

    const [data, setData] = useState<Ekstrakulikuler | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!ekstrakulikuler_id) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`
                );
                setData(response.data);
            } catch (error) {
                console.error('Gagal mengambil data ekstrakurikuler:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ekstrakulikuler_id]);

    if (loading) return <div className="text-center mt-10">Memuat data...</div>;

    if (!data) return <div className="text-center mt-10">Data ekstrakurikuler tidak ditemukan.</div>;

    return (
        <>
            <Header />
            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    {/* Gambar */}
                    <div className="max-w-3xl mx-auto">
                        <Image
                            src={`http://localhost:8000/storage/images/ekstrakulikuler/${data.ekstrakulikuler_url_gambar}`}
                            alt={`Gambar ${data.ekstrakulikuler_judul}`}
                            width={800}
                            height={600}
                            className="rounded-lg shadow-md object-contain w-full h-[400px]"
                        />
                    </div>


                    {/* Deskripsi */}
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-center md:text-left">
                            {data.ekstrakulikuler_judul}
                        </h2>
                        <p className="italic mt-2">{data.ekstrakulikuler_deskripsi}</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default EkstrakulikulerDetail;
