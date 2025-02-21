'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'; // Tambahkan useRef dan useEffect
import styles from './header.module.css';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEkstraOpen, setIsEkstraOpen] = useState(false);

  // Ref untuk dropdown Profile dan Ekstrakulikuler
  const profileRef = useRef<HTMLDivElement>(null);
  const ekstraRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menutup dropdown ketika klik di luar
  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsProfileOpen(false);
    }
    if (ekstraRef.current && !ekstraRef.current.contains(event.target as Node)) {
      setIsEkstraOpen(false);
    }
  };

  // Tambahkan event listener untuk mendeteksi klik di luar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-teal-700 text-white py-0 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/images/UPK/logo.png" alt="Logo SMP PGRI 6 Malang" width={80} height={80} />
        <h1 className="font-bold text-xl ml-1">SMP PGRI 6 Malang</h1>
      </div>
      <nav className="navbar">
        <ul className="flex space-x-2 ml-10 items-center">
          <li>
            <Link href="/beranda" className={styles.btn}>
              Beranda
            </Link>
          </li>
          <li className="relative">
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
          </li>
          <li>
            <Link href="/ppdb" className={styles.btn}>
              Ppdb
            </Link>
          </li>
          <li>
            <Link href="/Prestasiii" className={styles.btn}>
              Prestasi
            </Link>
          </li>
          <li>
            <Link href="/Prasarana" className={styles.btn}>
              Prasarana
            </Link>
          </li>
          <li className="relative">
            <button onClick={() => setIsEkstraOpen(!isEkstraOpen)} className={styles.btn}>
              Ekstrakulikuler
            </button>
            {isEkstraOpen && (
              <div ref={ekstraRef} className={`${styles.dropdown} ${styles.dropdownAnimation}`}>
                <Link href="/ekstrakulikuler/futsal" className={styles.dropdownItem}>
                Futsal
                </Link>
                <Link href="/ekstrakulikuler/marching_band" className={styles.dropdownItem}>
                  Marching Band
                </Link>
                <Link href="/ekstrakulikuler/banjari" className={styles.dropdownItem}>
                  Banjari
                </Link>
                <Link href="/ekstrakulikuler/tari" className={styles.dropdownItem}>
                  Tari
                </Link>
                <Link href="/ekstrakulikuler/paskibra" className={styles.dropdownItem}>
                  Paskibra
                </Link>
                <Link href="/ekstrakulikuler/pramuka" className={styles.dropdownItem}>
                  Pramuka
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;