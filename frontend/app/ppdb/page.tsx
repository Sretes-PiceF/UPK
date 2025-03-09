import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Page = () => {
    return (
        <>
            <Header />
            {/* Container Utama */}
            <div className="flex flex-col md:flex-row m-[50px] gap-6 ml-[180px]">
                {/* Sisi Kiri */}
                <div className="w-[200px] bg-gray-200 p-10">
                    <p className="text-center">Konten Samping Kiri</p>
                </div>



                {/* Container Gambar Tengah */}
                <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4 justify-center">
                    <div className="flex justify-center">
                        <img
                            src="/images/img-upk/ppdb2024.jpg"
                            className="w-[300px] h-[300px] object-cover"
                            alt="PPDB 2024"
                        />
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/images/img-upk/pppdb2025.jpg"
                            className="w-[300px] h-[300px] object-cover"
                            alt="PPDB 2025"
                        />
                    </div>
                </div>

                {/* Sisi Kanan */}
                <div className="w-[200px] bg-gray-200 p-10">
                    <p className="text-center">Konten Samping Kanan</p>
                </div>
            </div>

            {/* Container untuk No Telpon dan Google Maps */}
            <div className="relative w-full h-[350px] mt-[100px] drop-shadow-2xl">
                {/* Container No Telpon Pengurus di Kiri Bawah */}
                <div className="absolute bottom-5 left-5 w-[300px] h-[150px] p-5 bg-gray-500 rounded-lg shadow-lg flex flex-col justify-start">
                    <div className="text-center mb-4">
                        <h1 className="text-sm font-semibold text-white">Info PPDB Jangan lupa untuk Join:</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="https://wa.me/6281216146759/" className="text-sm font-semibold text-white">081216146759 | Bu Dia</a>
                        <a href="https://wa.me/6281230662365/" className="text-sm font-semibold text-white">081230662365 | Bu Indah</a>
                    </div>
                </div>

                {/* Kotak Lokasi Google Maps di Kanan Bawah */}
                <div className="absolute bottom-5 right-5 w-[700px] h-[300px] p-5 bg-gray-100 rounded-lg shadow-lg">
                    <div className="absolute inset-0 border-4 border-white rounded-lg pointer-events-none"></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63215.64254470472!2d112.58884743406196!3d-8.001240560281554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x2dd62807940c452f%3A0xeb1dd98f28849a85!2sSMP%20PGRI%206%20Malang%2C%20Jl.%20Kolonel%20Sugiono%20VIII%20No.82%2C%20Ciptomulyo%2C%20Kec.%20Sukun%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065148!3m2!1d-8.001337099999999!2d112.63002589999999!5e0!3m2!1sid!2sid!4v1740014807779!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;