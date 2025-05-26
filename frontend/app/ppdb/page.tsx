'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

interface PpdbItem {
    ppdb_id: number;
    ppdb_url_gambar: string;
    ppdb_deskripsi1: string;
    ppdb_deskripsi2: string;
    ppdb_notelp_1: string;
    ppdb_namaguru_1: string;
    ppdb_notelp_2: string;
    ppdb_namaguru_2: string;
}

const Page = () => {
    const [ppdbData, setPpdbData] = useState<PpdbItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/api/ppdb');
                if (result.data && Array.isArray(result.data.data)) {
                    setPpdbData(result.data.data);
                } else {
                    console.error('Data tidak valid:', result.data);
                }
            } catch (error) {
                console.error('Gagal mengambil data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const firstItem = ppdbData[0];

    return (
        <>
            <Header />

            {/* Container Utama */}
            <div className="flex flex-col md:flex-row mx-4 md:m-[50px] md:ml-[100px] gap-6 relative">
                {/* Sisi Kiri - Deskripsi */}
                {firstItem?.ppdb_deskripsi1 && (
                    <div className="hidden md:block w-[175px] h-[300px] bg-gray-200 p-10 absolute left-0 top-1/2 transform -translate-y-1/2">
                        <p className="text-center">{firstItem.ppdb_deskripsi1}</p>
                    </div>
                )}

                {/* Gambar Tengah */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2 mx-auto">
                    {ppdbData.map((item) => (
                        <div key={item.ppdb_id} className="flex justify-center">
                            <Image
                                src={`http://localhost:8000/storage/images/ppdb/${item.ppdb_url_gambar}`}
                                alt="Gambar PPDB"
                                width={300}
                                height={300}
                                className="rounded shadow-md object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Sisi Kanan - Deskripsi */}
                {firstItem?.ppdb_deskripsi2 && (
                    <div className="hidden md:block w-[175px] h-[300px] bg-gray-200 p-10 absolute right-0 top-1/2 transform -translate-y-1/2">
                        <p className="text-center">{firstItem.ppdb_deskripsi2}</p>
                    </div>
                )}
            </div>

            {/* Info Kontak dan Maps */}
            <div className="relative w-full px-4 md:px-0 mt-10 md:mt-[100px] min-h-[350px]">
                {/* Kontak Pengurus */}
                {firstItem && (
                    <div className="md:absolute bottom-5 left-5 w-full md:w-[300px] h-[150px] p-5 bg-gray-500 rounded-lg shadow-lg flex flex-col justify-start">
                        <div className="text-center mb-4">
                            <h1 className="text-sm font-semibold text-white">Info PPDB Jangan lupa untuk Join:</h1>
                        </div>
                        <div className="flex flex-col gap-2 md:ml-7">
                            {firstItem.ppdb_notelp_1 && (
                                <a
                                    href={`https://wa.me/${firstItem.ppdb_notelp_1}`}
                                    className="text-sm font-semibold text-white flex items-center gap-2"
                                >
                                    <Phone className="text-green-500" />
                                    {firstItem.ppdb_notelp_1} | {firstItem.ppdb_namaguru_1}
                                </a>
                            )}
                            {firstItem.ppdb_notelp_2 && (
                                <a
                                    href={`https://wa.me/${firstItem.ppdb_notelp_2}`}
                                    className="text-sm font-semibold text-white flex items-center gap-2"
                                >
                                    <Phone className="text-green-500" />
                                    {firstItem.ppdb_notelp_2} | {firstItem.ppdb_namaguru_2}
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Lokasi Maps */}
                <div className="md:absolute bottom-5 right-5 w-full md:w-[700px] h-[250px] md:h-[300px] mt-4 md:mt-0 p-1 md:p-5 bg-gray-100 rounded-lg shadow-lg">
                    <div className="absolute inset-0 border-4 border-white rounded-lg pointer-events-none hidden md:block"></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63215.64254470472!2d112.58884743406196!3d-8.001240560281554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x2dd62807940c452f%3A0xeb1dd98f28849a85!2sSMP%20PGRI%206%20Malang%2C%20Jl.%20Kolonel%20Sugiono%20VIII%20No.82%2C%20Ciptomulyo%2C%20Kec.%20Sukun%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065148!3m2!1d-8.001337099999999!2d112.63002589999999!5e0!3m2!1sid!2sid!4v1740014807779!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
