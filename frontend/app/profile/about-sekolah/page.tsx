'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProfileData {
  id: number;
  profile_guru: number;
  profile_siswa: number;
  jumlah_prestasi: number;
  jumlah_ekstrakulikuler: number;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/profile');
        if (result.data && Array.isArray(result.data.data)) {
          setProfileData(result.data.data);
        } else {
          console.error('Format data tidak valid:', result.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data profil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      {/* Profil Sekolah */}
      <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 pb-2">Profil Sekolah</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <p><strong>Nama Sekolah:</strong> SMP PGRI 6 MALANG</p>
            <p><strong>Alamat:</strong> Jl. Kolonel Sugiono VIII No.82, Kec. Ciptomulyo/Sukun, Malang</p>
            <p><strong>No. Telp/Fax:</strong> 0341-368806</p>
            <p><strong>NPWP/NPSN:</strong> 00.454.069.6-623.000 / 2040561</p>
            <p><strong>Jenjang Akreditasi:</strong> B</p>
            <p><strong>SK Akreditasi:</strong> Dkp 021859</p>
            <p><strong>Kode Pos:</strong> 65148</p>
            <p><strong>Tahun Didirikan:</strong> TH 1981</p>
            <p><strong>Kepemilikan Tanah:</strong> Milik Pemerintah Kota Malang</p>
            <p><strong>Status Tanah:</strong> Milik Pemerintah Kota Malang</p>
            <p><strong>Luas Tanah:</strong> 2378 m²</p>
            <p><strong>Luas Bangunan:</strong> 950 m²</p>
            <p><strong>Organisasi Penyelenggara:</strong> PPLP DASMEN PGRI JAWA TIMUR CABANG MALANG</p>
            <p><strong>Alamat Yayasan:</strong> JL. Tretes No.18 Claket Malang</p>
          </div>
          <div>
            <Image
              src="/images/img-UPK/fotoguru.jpg"
              alt="Foto Guru"
              width={800}
              height={400}
              className="rounded-lg w-full object-cover max-h-[400px]"
            />

          </div>
        </div>
      </section>

      {!loading && profileData.length > 0 && (
        <section className="container mx-auto my-8 bg-teal-700 text-white p-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {profileData.map((rs, index) => (
            <div key={`profile-${rs.id || index}`} className="contents">
              <div>
                <i className="fas fa-chalkboard-teacher text-4xl mb-2"></i>
                <p className="text-2xl font-bold">{rs.profile_guru}</p>
                <p>Guru</p>
              </div>
              <div>
                <i className="fas fa-user-graduate text-4xl mb-2"></i>
                <p className="text-2xl font-bold">{rs.profile_siswa}</p>
                <p>Siswa</p>
              </div>
              <div>
                <i className="fas fa-trophy text-4xl mb-2"></i>
                <p className="text-2xl font-bold">{rs.jumlah_prestasi}</p>
                <p>Prestasi</p>
              </div>
              <div>
                <i className="fas fa-ring text-4xl mb-2"></i>
                <p className="text-2xl font-bold">{rs.jumlah_ekstrakulikuler}</p>
                <p>Ekstrakurikuler</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Bagian Bawah Profil */}
      <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Bagian bawah profil</h3>

        {/* Baris Pertama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          <div>
            <Image
              src="/images/UPK/sekolah1.jpg"
              alt="Gedung Sekolah"
              width={800}
              height={350}
              className="rounded-lg shadow-md w-full object-cover max-h-[350px]"
            />

          </div>
          <div className="bg-gray-200 rounded-lg shadow-md p-6 md:w-80 mx-auto text-center flex items-center h-[250px]">
            <p className="italic">
              “SMP PGRI 6 MALANG adalah sekolah yang penuh dengan nilai-nilai budaya dan kelestarian tentang alam, kita diajarkan untuk hidup terus bersyukur kepada Tuhan Yang Maha Esa dan tetap saling toleransi antar teman, antar guru, dan antar umat beragama.”
            </p>
          </div>
        </div>

        {/* Baris Kedua */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          <div className="bg-gray-200 rounded-lg shadow-md p-6 md:w-80 mx-auto text-center flex items-center h-[250px]">
            <p className="italic">
              “Jangan pernah menyia-nyiakan kesempatan karena di mana kesempatan yang datang kepada kita itu adalah nikmat Tuhan untuk memberikan jalan menuju kesuksesan...”
            </p>
          </div>
          <div>
            <Image
              src="/images/UPK/sekolah2.jpg"
              alt="Lingkungan Sekolah"
              width={800}
              height={350}
              className="rounded-lg shadow-md w-full object-cover max-h-[350px]"
            />

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
