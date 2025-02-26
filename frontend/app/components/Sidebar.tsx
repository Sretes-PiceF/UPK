'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
    return (
        <aside className="w-1/5 bg-teal-700 text-white p-4 flex flex-col items-center">
            <Image
                src="/images/UPK/logo.png" alt="Logo Sekolah" width={80} height={80} className="w-25 mb-4" />
            <nav className="w-full">
                <Link href="/Admin/Profile_admin" className="block bg-red-500 text-center py-2 my-2 rounded-md">Profil</Link>
                <Link href="/Admin/ppdb_admin" className="block bg-red-500 text-center py-2 my-2 rounded-md">PPDB</Link>
                <Link href="/Admin/prestasi_admin" className="block bg-red-500 text-center py-2 my-2 rounded-md">Prestasi</Link>
                <Link href="/Admin/ekstrakulikuler_admin" className="block bg-red-500 text-center py-2 my-2 rounded-md">Ekstrakulikuler</Link>
                <Link href="/Admin/Login" className="block bg-red-500 text-center py-2 my-2 rounded-md">Log Out</Link>
            </nav>
            <div className="mt-auto">
                <Image src="/images/UPK/logo bawah.png" alt="User Profile" width={64} height={64} className="w-16" />
            </div>
        </aside>
    );
}