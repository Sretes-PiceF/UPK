import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";

const Foto = () => {
    return (
        <>
            <Header />
            <section className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg shadow-top insert-shadow-sm drop-shadow-xl">
                {/* Header Section */}
                <div className="bg-teal-700 text-white shadow-md rounded-lg px-6 py-4 inline-flex items-center drop-shadow-lg">
                    <h2 className="text-xl font-bold">Foto Guru SMP PGRI 6 Malang</h2>
                </div>

                {/* Gallery Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 justify-center">
                    <Image
                        src="/images/foto_guru/foto1.jpg"
                        alt="Guru 1"
                        width={300}
                        height={256}
                        className="rounded-lg shadow-md object-cover w-full h-64"
                    />
                    <Image
                        src="/images/foto_guru/foto2.jpg"
                        alt="Guru 2"
                        width={300}
                        height={256}
                        className="rounded-lg shadow-md object-cover w-full h-64"
                    />
                    <Image
                        src="/images/foto_guru/foto3.jpg"
                        alt="Guru 3"
                        width={300}
                        height={256}
                        className="rounded-lg shadow-md object-cover w-full h-64"
                    />

                </div>
            </section>
            <Footer />
        </>
    );
};


export default Foto