import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
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
                        <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl">
                            <img src="/images/juara/IMG-20250128-WA0006.jpg" alt="Zara Izzatul Aulia" className="w-[500px] h-[335px] rounded-lg" />
                            <p className="mt-2">Juara : 1</p>
                            <span className="font-bold block my-2">Zara Izzatul Aulia</span>
                            <p>Juara Lomba Tari Tradisional tingkat Jawa Timur 2024</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md w-64 drop-shadow-2xl">
                            <img src="/images/juara/IMG-20250128-WA0007.jpg" alt="Lukhman Hakim" className="w-[500px] h-[335px] rounded-lg" />
                            <p className="mt-2">Juara : 2</p>
                            <span className="font-bold block my-2">Moch. Lukhman Hakim Zulkarnain</span>
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
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Profile