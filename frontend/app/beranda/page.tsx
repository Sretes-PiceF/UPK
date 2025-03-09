import React from 'react'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Header from '@/components/Header'

export default function Beranda() {
  return (
    <>
      {/* Pemanggilan Header yang Benar */}
      <Header />

      <main className="container mx-auto mt-12 px-6">
        <div className="bg-teal-700 text-white shadow-md rounded-lg px-6 py-5 pr-10 inline-block skew-x-12">
          <h2 className="text-xl font-bold mb-3">Hormat Kami,</h2>
        </div>

        <div className="text-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center max-w-5xl mx-auto mt-6 bg-gradient-to-r from-teal-700 to-green-400  bg-[length:100%_1000%] bg-[right_100px_top_0]">
          <div className="flex-1 md:px-6">
            <h2 className="text-3xl font-bold mb-4">Selamat Datang di SMP PGRI 6 Malang</h2>
            <p className="text-lg leading-relaxed">
              Assalamualaikum Wr. Wb. Saya Rohma Mutiara Wati, Kepala Sekolah SMP PGRI 6 Malang,
              mengucapkan terima kasih atas kunjungan Anda ke website kami. Semoga informasi yang kami sajikan
              bermanfaat bagi Anda.
            </p>
          </div>
          <div className="w-[190px] h-[250px] mt-6 md:mt-0 flex-shrink-0">
            <img src="/images/UPK/Foto  kepala sekolah.jpg" className="w-full h-full rounded-lg object-cover shadow-md" alt="Kepala Sekolah" />
          </div>
        </div>
      </main>

      {/* Section Berita & Kegiatan */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Berita & Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/UPK/nobar.jpg" width={400} height={200} className="w-full h-48 object-cover" alt="Nonton Film Edukasi" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Nonton Film Edukasi</h3>
              <p className="text-gray-600 mt-2">Para siswa melihat dan mencatat bagian penting dari film edukasi.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/images/UPK/ceramah.jpg" width={400} height={200} className="w-full h-48 object-cover" alt="Peringatan Maulid Nabi" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Maulid Nabi</h3>
              <p className="text-gray-600 mt-2">Peringatan Maulid Nabi diikuti oleh seluruh siswa dengan penuh khidmat.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/images/UPK/senam sehat.jpg" width={400} height={200} className="w-full h-48 object-cover" alt="Senam Sehat" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Senam Sehat</h3>
              <p className="text-gray-600 mt-2">Kegiatan senam sehat bersama dilakukan untuk meningkatkan kebugaran siswa.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
