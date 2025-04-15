import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Page = () => {
    return (
        <>

            <Header />
            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold border-b-2 pb-2">Visi & Misi</h2>

                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-teal-700">Visi</h3>
                    <p className="list-decimal list-inside mt-1">Terwujudnya warga sekolah yang berkarakter,berbudaya lingkungan,berlandaskan iman dan taqwa</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-teal-700">Misi</h3>
                    <ol className="list-decimal list-inside mt-2">
                        <li>Menumbuhkembangkan sikap dan amaliah keagama islaman dalam kehidupan sehari-hari untuk membekali iman dan taqwa.</li>
                        <li>Membudayakan hidup disiplin,berbudi pekerti luhur, jujur, berjiwa sosial dan bekerja keras.</li>
                        <li>Melaksanakan pembelajaran dan bimbingan secara efektif, sehingga setiap peserta didik dapat bekembang secara optimal sesuai dengan potensi yang dimiliki.</li>
                        <li>Melengkapi sarana dan prasarana pendidikan dan teknologi (IPTEK).</li>
                        <li>Menumbuhkan semangat untuk peduli dan berbudaya lingkungan.</li>
                        <li>Mencegah pencemaran dan kerusakan lingkungan.</li>
                        <li>Menerapkan kelestarian fungsi lingkungan hidup.</li>
                    </ol>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Page