'use client';
import Link from 'next/link';
import styles from './header.module.css'
const Header = () => {
  return (
    <header className="bg-teal-700 text-white py-0 px-6 flex items-center justify-between">
    <div className="flex items-center">
      <img src="/images/UPK/logo.png" alt="Logo SMP PGRI 6 Malang" width={80} height={80} />
      <h1 className="font-bold text-xl ml-1">SMP PGRI 6 Malang</h1>
    </div>
    <nav className="navbar">
      <ul className="flex space-x-4">
        <li>
          <button className={styles.btn}>
            <Link href="/beranda">Beranda</Link>
          </button>
        </li>
        <li>
          <button className={styles.btn}>
            <Link href="/profile">Profile</Link>
          </button>
        </li>
        <li>
          <button className={styles.btn}>
            <Link href="/ppdb">PPDB</Link>
          </button>
        </li>
        <li>
          <button className={styles.btn}>
            <Link href="/Prestasiii">Prestasi</Link>
          </button>
        </li>
        <li>
          <button className={styles.btn}>
            <Link href="/ekstra">Ekstrakulikuler</Link>
          </button>
        </li>

      </ul>
    </nav>
  </header>
  );
};



export default Header;