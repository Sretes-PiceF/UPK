'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';

interface PrestasiItem {
    prestasi_id: number;
    prestasi_url_gambar: string;
    prestasi_juara: string;
    prestasi_namasiswa: string;
    prestasi_deskripsi: string;
}

const Profile = () => {
    const [prestasiData, setPrestasiData] = useState<PrestasiItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/api/prestasi');
                if (result.data && Array.isArray(result.data.data)) {
                    setPrestasiData(result.data.data);
                } else {
                    console.error('Data tidak valid:', result.data);
                }
            } catch (error) {
                console.error('Gagal mengambil data prestasi:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <>
            <Header />

            <main className="container mx-auto p-4">
                <section className="text-center py-8">
                    <div className="flex justify-start mb-6">
                        <div className="bg-teal-700 text-white shadow-md rounded-lg px-5 py-4 inline-block -skew-x-12 text-left">
                            <h2 className="text-lg font-bold skew-x-12">Berita Terkini</h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {prestasiData.map((rs) => (
                            <div
                                key={rs.prestasi_id}
                                className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[300px] md:w-[270px] drop-shadow-2xl"
                            >
                                <div className="relative w-full h-[312px] rounded-lg overflow-hidden">
                                    <Image
                                        src={`http://localhost:8000/storage/images/prestasi/${rs.prestasi_url_gambar}`}
                                        alt={`Gambar ${rs.prestasi_namasiswa}`}
                                        width={900}
                                        height={600}
                                        className="object-cover"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-700">Juara: {rs.prestasi_juara}</p>
                                <span className="font-bold block my-2 text-base">{rs.prestasi_namasiswa}</span>
                                <p className="text-sm text-gray-600">{rs.prestasi_deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Profile;
