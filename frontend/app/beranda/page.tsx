'use client'

import React, { useRef } from 'react'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Header from '@/components/Header'
import { motion as m, useAnimation, useInView } from 'framer-motion'
import { useEffect } from 'react'

export default function Beranda() {
  const bgControls = useAnimation();
  const photoControls = useAnimation();
  const textControls = useAnimation();
  const newsRef = useRef(null);
  const isInView = useInView(newsRef, { once: false, margin: "-100px" });

  // Animasi untuk card berita
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Efek untuk animasi scroll
  useEffect(() => {
    if (isInView) {
      // Trigger animasi saat section masuk viewport
    }
  }, [isInView]);

  useEffect(() => {
    const sequence = async () => {
      await bgControls.start({
        backgroundPosition: "right 0px top 0",
        transition: { duration: 1.5 }
      });
      await photoControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8 }
      });
      await textControls.start({
        width: "100%",
        transition: { duration: 1.5 }
      });
    };
    sequence();
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto mt-12 px-6">
        <div className="relative inline-block">
          <m.div
            className="
        bg-teal-700 
        text-white 
        shadow-md 
        rounded-lg 
        px-6 
        py-5 
        pr-10 
        inline-block 
        relative 
        z-10
        skew-x-12 
        origin-left-center
      "
            style={{ display: 'inline-block' }}
            initial={{
              x: '-100%',
              opacity: 0,
              skewX: '24deg' // Nilai awal lebih ekstrim untuk efek animasi
            }}
            animate={{
              x: 0,
              opacity: 1,
              skewX: '12deg' // Nilai akhir
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] // Kurva easing natural
            }}
          >
            <m.h2
              className="text-xl font-bold mb-3 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.6
              }}
            >
              Hormat Kami,
            </m.h2>
          </m.div>

          {/* Shadow untuk efek visual lebih baik */}
          <div className="absolute inset-0 bg-teal-800 rounded-lg skew-x-12 -z-10 origin-left-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <m.div
          className="text-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center max-w-5xl mx-auto mt-6 bg-gradient-to-r from-teal-700 to-green-400 bg-[length:100%_1000%] bg-[right_100px_top_0] overflow-hidden"
          initial={{ backgroundPosition: "right 100px top 0" }}
          animate={bgControls}
        >
          <div className="flex-1 md:px-6">
            {/* Animasi judul mengetik */}
            <m.h2
              className="text-3xl font-bold mb-4 overflow-hidden whitespace-nowrap"
              initial={{ width: 0 }}
              animate={textControls}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            >
              Selamat Datang di SMP PGRI 6 Malang
            </m.h2>

            {/* Animasi paragraf mengetik */}
            <m.p
              className="text-lg leading-relaxed overflow-hidden"
              initial={{ width: 0 }}
              animate={textControls}
              transition={{ delay: 1, duration: 2, ease: [0.19, 1, 0.22, 1] }}
            >
              Assalamualaikum Wr. Wb. Saya Rohma Mutiara Wati, Kepala Sekolah SMP PGRI 6 Malang,
              mengucapkan terima kasih atas kunjungan Anda ke website kami. Semoga informasi yang kami sajikan
              bermanfaat bagi Anda.
            </m.p>
          </div>

          {/* Foto dengan animasi muncul */}
          <m.div
            className="w-[190px] h-[250px] mt-6 md:mt-0 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={photoControls}
          >
            <img
              src="/images/UPK/Foto_kepala_sekolah.jpg"
              className="w-full h-full rounded-lg object-cover shadow-md"
              alt="Kepala Sekolah"
            />
          </m.div>
        </m.div>
      </main>

      {/* Section Berita & Kegiatan dengan Animasi Scroll */}
      <section className="container mx-auto py-12 px-6" ref={newsRef}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Berita & Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <m.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <img
              src="/images/UPK/nobar.jpg"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              alt="Nonton Film Edukasi"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">Nonton Film Edukasi</h3>
              <p className="text-gray-600 mt-2">Para siswa melihat dan mencatat bagian penting dari film edukasi.</p>
            </div>
          </m.div>

          <m.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/UPK/ceramah.jpg"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              alt="Peringatan Maulid Nabi"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">Maulid Nabi</h3>
              <p className="text-gray-600 mt-2">Peringatan Maulid Nabi diikuti oleh seluruh siswa dengan penuh khidmat.</p>
            </div>
          </m.div>

          <m.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            transition={{ delay: 0.4 }}
          >
            <Image
              src="/images/UPK/senam sehat.jpg"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              alt="Senam Sehat"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">Senam Sehat</h3>
              <p className="text-gray-600 mt-2">Kegiatan senam sehat bersama dilakukan untuk meningkatkan kebugaran siswa.</p>
            </div>
          </m.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
