import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";

const Page = () => {
return(
    <>

    <Header />
  <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold border-b-2 pb-2">Visi & Misi</h2>
    
    <div className="mt-4">
        <h3 className="text-xl font-semibold text-teal-700">Visi</h3>
        <p className="mt-2 italic">Menjadi sekolah unggulan yang berlandaskan nilai budaya dan karakter bangsa dalam menghadapi era globalisasi.</p>
    </div>

    <div className="mt-6">
        <h3 className="text-xl font-semibold text-teal-700">Misi</h3>
        <ul className="list-disc list-inside mt-2">
            <li>Menanamkan nilai-nilai budaya dan karakter bangsa kepada peserta didik.</li>
            <li>Mengembangkan lingkungan belajar yang kondusif, inovatif, dan berbasis teknologi.</li>
            <li>Meningkatkan kualitas tenaga pendidik dan kependidikan secara berkelanjutan.</li>
            <li>Membangun kemitraan dengan masyarakat dan dunia industri dalam mendukung pendidikan.</li>
            <li>Mewujudkan lulusan yang berprestasi, berakhlak mulia, dan siap menghadapi tantangan global.</li>
        </ul>
    </div>
</section>

<Footer />
    </>
)
}

export default Page