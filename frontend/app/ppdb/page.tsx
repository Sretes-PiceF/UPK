import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Page = () => {
    return(
        <>
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 ">
            <div className="bg-gray-200 p-4 rounded-lg text-center">
                <h2 className="text-lg font-bold mb-2">
                    Info penting loh!?
                </h2>
                <p>
                    Kenali dulu soal PPDB yang di buka di SMP PGRI 6 Malang...
                </p>
            </div>
            <div className="flex justify-center">
                <img alt="Poster Penerimaan Peserta Didik Baru SMP PGRI 6 Malang" className="rounded-lg" height="400"
                    src="https://storage.googleapis.com/a1aa/image/fRVk4e6jDWqAktEA0FmRvHKbO0BuZBDtFioxGPDW9no.jpg"
                    width="300" />
            </div>
            <div className="flex justify-center">
                <img alt="Poster PPDB SMP PGRI 6 Malang Tahun Ajaran 2024/2025" className="rounded-lg" height="400"
                    src="https://storage.googleapis.com/a1aa/image/_ChltKU2JHCDUYU5BNsatqvV13M5J-re1IiupV7YQ_c.jpg"
                    width="300" />
            </div>
        </div>
            <Footer />
        </>
    )
}

export default Page