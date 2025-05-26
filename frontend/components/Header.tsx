'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { Menu } from 'lucide-react';

type Ekstrakulikuler = {
  ekstrakulikuler_id: string;
  ekstrakulikuler_judul: string;
};

const Header = () => {
  const [ekstrakulikulerData, setEkstrakulikulerData] = useState<Ekstrakulikuler[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEkstraOpen, setIsEkstraOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const ekstraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEkstrakulikulerData = async () => {
      try {
        const result = await axios("http://localhost:8000/api/ekstrakulikuler");
        if (Array.isArray(result.data?.data)) {
          setEkstrakulikulerData(result.data.data);
        }
      } catch (error) {
        console.error("Gagal fetch ekstrakulikuler:", error);
      }
    };

    fetchEkstrakulikulerData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (ekstraRef.current && !ekstraRef.current.contains(event.target as Node)) {
        setIsEkstraOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <m.header className="bg-teal-700 text-white py-2 px-4 flex flex-col md:flex-row md:items-center md:justify-between"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: 0.8,
        duration: 0.6
      }}
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center">
          <m.img src="/images/UPK/Logo.png" alt="Logo SMP PGRI 6 Malang" width={60} height={60}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1.0,
              duration: 0.6
            }}
          />
          <m.h1 className="font-bold text-lg ml-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1.7,
              duration: 0.6
            }}
          >SMP PGRI 6 Malang</m.h1>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Menu navbar */}
      <nav className={`mt-2 md:mt-0 ${isNavOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <m.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 0.6
            }}
          >
            <Link href="/beranda" className={styles.btn} >
              Beranda
            </Link>
          </m.li>
          <m.li className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 2.8,
              duration: 0.6
            }}
          >
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={styles.btn}>
              Profile
            </button>
            {isProfileOpen && (
              <div ref={profileRef} className={`${styles.dropdown} ${styles.dropdownAnimation}`}>
                <Link href="/profile/about-sekolah" className={styles.dropdownItem}>
                  Profile Detail Sekolah
                </Link>
                <Link href="/profile/visi_dan_misi" className={styles.dropdownItem}>
                  Visi & Misi
                </Link>
                <Link href="/profile/fotoguru" className={styles.dropdownItem}>
                  Foto Guru
                </Link>
              </div>
            )}
          </m.li>
          <m.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3.0,
              duration: 0.6
            }}
          >
            <Link href="/ppdb" className={styles.btn}>
              PPDB
            </Link>
          </m.li>
          <m.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3.2,
              duration: 0.6
            }}
          >
            <Link href="/Prestasiii" className={styles.btn}>
              Prestasi
            </Link>
          </m.li>
          <m.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3.4,
              duration: 0.6
            }}
          >
            <Link href="/Prasarana" className={styles.btn}>
              Prasarana
            </Link>
          </m.li>
          <m.li className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3.6,
              duration: 0.6
            }}
          >
            <button onClick={() => setIsEkstraOpen(!isEkstraOpen)} className={styles.btn}>
              Ekstrakulikuler
            </button>
            {isEkstraOpen && (
              <div ref={ekstraRef} className={`${styles.dropdown} ${styles.dropdownAnimation}`}>
                {ekstrakulikulerData.map((rs, index) => (
                  <Link
                    href={`/ekstrakulikuler/${rs.ekstrakulikuler_id}`}
                    className={styles.dropdownItem}
                    key={rs.ekstrakulikuler_id || index}
                  >
                    {rs.ekstrakulikuler_judul}
                  </Link>
                ))}
              </div>
            )}
          </m.li>
        </ul>
      </nav>
    </m.header>
  );
};

export default Header;
