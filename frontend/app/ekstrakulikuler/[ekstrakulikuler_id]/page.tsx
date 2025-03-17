'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EkstrakulikulerDetail = () => {
    const { ekstrakulikuler_id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [ekstrakulikuler_id]);

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/ekstrakulikuler/${ekstrakulikuler_id}`);
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Data tidak ditemukan</div>;
    }

    return (
        <>
            <Header />
            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            {/* Gambar */}
                            <div className="flex justify-center">
                                <img
                                    src={`http://localhost:8000/storage/images/ekstrakulikuler/${data.ekstrakulikuler_url_gambar}`} alt="Space gambar" className="rounded-lg shadow-md w-full md:w-[600px] h-[400px] object-cover" />
                            </div>

                            {/* Deskripsi */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-center md:text-left">{data.ekstrakulikuler_judul}</h2>
                                <p className="italic mt-2">
                                    {data.ekstrakulikuler_deskripsi}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default EkstrakulikulerDetail;