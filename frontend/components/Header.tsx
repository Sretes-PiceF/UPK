'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import axios from 'axios';

const Header = () => {
  const [prestasiData, setPrestasiData] = useState([]);
  const [ekstrakulikulerData, setEkstrakulikulerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEkstraOpen, setIsEkstraOpen] = useState(false);

  const profileRef = useRef(null);
  const ekstraRef = useRef(null);

  useEffect(() => {
    fetchData();
    fetchEkstrakulikulerData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:8000/api/prestasi");
      if (result.data && Array.isArray(result.data.data)) {
        setPrestasiData(result.data.data);
      } else {
        console.error("Data tidak ada", result.data);
      }
    } catch (error) {
      console.error("Data error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEkstrakulikulerData = async () => {
    try {
      const result = await axios("http://localhost:8000/api/ekstrakulikuler");
      if (result.data && Array.isArray(result.data.data)) {
        setEkstrakulikulerData(result.data.data);
      } else {
        console.error("Data ekstrakulikuler tidak ada", result.data);
      }
    } catch (error) {
      console.error("Data ekstrakulikuler error", error);
    }
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
    if (ekstraRef.current && !ekstraRef.current.contains(event.target)) {
      setIsEkstraOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                {ekstrakulikulerData.map((rs, index) => (
                  <Link href={`/ekstrakulikuler/${rs.ekstrakulikuler_id}`} className={styles.dropdownItem} key={rs.ekstrakulikuler_id || index}>
                    {rs.ekstrakulikuler_judul}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;