import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Profile = () => {
  return (
    <>
      <Header />
      {/* <!-- Profil Sekolah --> */}
      <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 pb-2">Profile Sekolah</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <p>
              <strong>Nama Sekolah:</strong> SMP PGRI 6 MALANG
            </p>
            <p>
              <strong>Alamat:</strong> Jl. Kolonel Sugiono VIII No.82, Kec.
              Ciptomulyo/Sukun, Malang
            </p>
            <p>
              <strong>No. Telp/Fax:</strong> 0341-368806
            </p>
            <p>
              <strong>NPWP/NPSN:</strong> 00.454.069.6-623.000/2040561
            </p>
            <p>
              <strong>Jenjang Akreditasi:</strong> B
            </p>
            <p>
              <strong>SK Akreditasi:</strong> Dkp 021859
            </p>
            <p>
              <strong>Kode Pos:</strong> 65148
            </p>
            <p>
              <strong>Tahun Didirikan:</strong> TH 1981
            </p>
            <p>
              <strong>Kepemilikan Tanah:</strong> Milik Pemerintah Kota Malang
            </p>
            <p>
              <strong>Status Tanah:</strong> Milik Pemerintah Kota Malang
            </p>
            <p>
              <strong>Luas Tanah:</strong> 2378 m²
            </p>
            <p>
              <strong>Luas Bangunan:</strong> 950 m²
            </p>
            <p>
              <strong>Organisasi Penyelenggara:</strong> PPLP DASMEN PGRI JAWA
              TIMUR CABANG MALANG
            </p>
            <p>
              <strong>Alamat Yayasan:</strong> JL. Tretes No.18 Claket Malang
            </p>
          </div>
          <div>
            <img src="/images/img-UPK/foto guru.jpg" alt="Foto Guru" className="rounded-lg" />
          </div>
        </div>
      </section>
      {/*        
      <!-- Statistik Sekolah --> */}
      <section className="container mx-auto my-8 bg-teal-700 text-white p-6 rounded-lg flex justify-around text-center">
        <div>
          <i className="fas fa-chalkboard-teacher text-4xl"></i>
          <p className="text-2xl font-bold">20</p>
        </div>
        <div>
          <i className="fas fa-user-graduate text-4xl"></i>
          <p className="text-2xl font-bold">210</p>
        </div>
        <div>
          <i className="fas fa-trophy text-4xl "></i>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div>
          <i className="fas fa-ring text-4xl"></i>
          <p className="text-2xl font-bold">6</p>
        </div>
      </section>

      <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Bagian bawah profil</h3>

        {/* <!-- Baris Pertama --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          {/* <!-- Gambar --> */}
          <div>
            <img
              src="/images/UPK/sekolah 1.jpg"
              alt="Gedung Sekolah"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* <!-- Container Teks --> */}
          <div className="bg-gray-200 rounded-lg shadow-md ml-2 p-[40px] w-full h-[250px] md:w-80 mx-auto text-center flex items-center">
            <p className="italic">
              “SMP PGRI 6 MALANG adalah sekolah yang penuh dengan nilai-nilai budaya dan kelestarian tentang alam, kita diajarkan untuk hidup terus bersyukur kepada Tuhan Yang Maha Esa dan tetap saling toleransi antar teman, antar guru, dan antar umat beragama.”
            </p>
          </div>
        </div>

        {/* <!-- Baris Kedua --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          {/* <!-- Container Teks --> */}
          <div className="bg-gray-200 rounded-lg shadow-md mr-2 p-[50px] w-full h-[250px] md:w-80 mx-auto text-center flex items-center">
            <p className="italic">
              “Jangan pernah menyia-nyiakan kesempatan karena di mana kesempatan yang datang kepada kita itu adalah nikmat Tuhan untuk memberikan jalan menuju kesuksesan...”
            </p>
          </div>

          {/* <!-- Gambar --> */}
          <div>
            <img
              src="/images/UPK/sekolah 2.jpg"
              alt="Lingkungan Sekolah"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>

      </section>
      <Footer />
    </>
  );
};

export default Profile;
