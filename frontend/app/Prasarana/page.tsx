import Footer from "../components/Footer";
import Header from "../components/Header";

const Prasarana = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Lab Komputer */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="w-full md:w-1/2">
                        <img src="/images/UPK/Lab Kom.jpg" alt="Lab Komputer" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-4 md:mt-0 md:ml-8">
                        <h2 className="text-xl font-bold mb-4">Lab Komputer</h2>
                        <p className="text-gray-700">
                            Di SMP PGRI 6 MALANG terdapat lab komputer yang terletak di sebelah ruang kepala sekolah, untuk membantu siswa mengembangkan keterampilan teknologi informasi dan komunikasi. Lab komputer juga dapat menjadi tempat untuk berdiskusi dan berkolaborasi antara siswa.
                        </p>
                    </div>
                </div>

                {/* Musholla */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mr-8 md:mt-0 md:ml-10">
                        <h2 className="text-xl font-bold mb-4">Musholla</h2>
                        <p className="text-gray-700">
                            Di SMP PGRI 6 MALANG terdapat musholla yang nyaman untuk kegiatan ibadah siswa dan staf. Musholla ini dilengkapi dengan fasilitas yang memadai untuk mendukung kegiatan keagamaan.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src="/images/UPK/musholla.jpg" alt="Musholla" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Lapangan */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="w-full md:w-1/2">
                        <img src="/images/UPK/lapangan.jpg" alt="Lapangan" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-4 md:mt-0 md:ml-8">
                        <h2 className="text-xl font-bold mb-4">Lapangan</h2>
                        <p className="text-gray-700">
                            Di SMP PGRI 6 MALANG terdapat lapangan yang luas untuk kegiatan olahraga dan kegiatan luar ruangan lainnya. Lapangan ini digunakan untuk berbagai kegiatan seperti upacara, olahraga, dan acara sekolah.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Prasarana;