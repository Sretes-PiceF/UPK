'use client'

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const Profile = () => {
    const [prestasiData, setPrestasiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:8000/api/prestasi");
            console.log("Data prestasi:", result.data); // Cek hasil API di console
            if (result.data && Array.isArray(result.data.data)) {
                setPrestasiData(result.data.data);
            } else {
                console.error("Data tidak ada", result.data);
            }
        } catch (error) {
            console.error("Data error", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Header />
            {/* <!-- Main Content --> */}
            <main className="container mx-auto p-4">
                <section className="text-center py-8">
                    <div className="bg-teal-700 text-white shadow-md rounded-lg px-5 py-7 pr-[20px] inline-block -skew-x-12 mr-[1030px] relative">
                        <h2 className="text-center font-bold">• Berita Terkini</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {/* <!-- Item Prestasi --> */}
                        {prestasiData.map((rs, index) => (
                            <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl" key={rs.prestasi_id || index}>
                                <img src={`http://localhost:8000/storage/images/prestasi/${rs.prestasi_url_gambar}`} alt="Gambar prestasi" className="w-[500px] h-[335px] rounded-lg" />
                                <p className="mt-2">{rs.prestasi_juara}</p>
                                <span className="font-bold block my-2">{rs.prestasi_namasiswa}</span>
                                <p>{rs.prestasi_deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Profile

{/* <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl">
                            <img src="/images/juara/IMG-20250128-WA0007.jpg" alt="Zara Izzatul Aulia" className="w-[500px] h-[335px] rounded-lg" />
                            <p className="mt-2">Juara : 2</p>
                            <span className="font-bold block my-2">Zara Izzatul Aulia</span>
                            <p>Juara Olimpiade IPA tingkat Nasional 2024</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl">
                            <img src="/images/juara/IMG-20250128-WA0008.jpg" alt="Kompetisi Sains" className="w-full rounded-lg" />
                            <p className="mt-2">Juara : 3</p>
                            <span className="font-bold block my-2">Moch. Lukhman Hakim Zulkarnain</span>
                            <p>Juara tingkat Nasional Kompetisi Sains Siswa Nasional - Bidang Matematika 2024</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl">
                            <img src="/images/juara/IMG-20250128-WA0011.jpg" alt="Kompetisi Sains" className="w-[500px] h-[340px] rounded-lg" />
                            <p className="mt-2">Juara : 3</p>
                            <span className="font-bold block my-2">Moch. Lukhman Hakim Zulkarnain</span>
                            <p>Juara tingkat Nasional Kompetisi Sains Siswa Nasional - Bidang Matematika 2024</p>
                        </div> */}