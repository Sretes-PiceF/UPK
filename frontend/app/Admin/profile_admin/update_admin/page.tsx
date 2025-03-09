import Sidebar from "@/components/Sidebar";

export default function ProfileAdmin() {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">PROFILE</h1>
                    <p className="text-gray-600">Halaman Update Data Profil</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block font-medium">Input Jumlah Data Guru</label>
                            <input type="number" className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200" placeholder="Masukkan jumlah guru" />
                        </div>
                        <div>
                            <label className="block font-medium">Input Jumlah Data Siswa</label>
                            <input type="number" className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200" placeholder="Masukkan jumlah siswa" />
                        </div>
                        <div>
                            <label className="block font-medium">Input Jumlah Data Prestasi</label>
                            <select className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200">
                                <option>Jumlah Data Prestasi Otomatis</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Input Jumlah Data Ekstrakurikuler</label>
                            <select className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200">
                                <option>Jumlah Data Ekstrakurikuler Otomatis</option>
                            </select>
                        </div>
                    </div>

                    <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Update</button>
                    <p className="mt-4 text-green-600 font-medium"></p>
                </main>
            </div>
        </>
    );
}