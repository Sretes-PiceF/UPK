import Sidebar from "@/app/components/Sidebar";

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
                        <label className="block font-medium">Input Jumlah Guru</label>
                        <input type="number" className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200" placeholder="Masukkan jumlah guru" />
                    </div>
                    <div>
                        <label className="block font-medium">Input Data Siswa</label>
                        <input type="number" className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200" placeholder="Masukkan jumlah siswa" />
                    </div>
                    <div>
                        <label className="block font-medium">Input Data Prestasi</label>
                        <select className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200">
                            <option>Pilih Prestasi</option>
                            <option>Juara 1 Lomba Matematika</option>
                            <option>Juara 2 Futsal</option>
                            <option>di sambungkan ke database</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Input Data Ekstrakurikuler</label>
                        <select className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-200">
                            <option>Pilih Ekstrakurikuler</option>
                            <option>Futsal</option>
                            <option>Marching Band</option>
                            <option>Tari</option>
                            <option>Pramuka</option>
                            <option>Banjari</option>
                        </select>
                    </div>
                </div>

                <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Update Profil</button>
                <p className="mt-4 text-green-600 font-medium"></p>
            </main>
        </div>
        </>
    );
}