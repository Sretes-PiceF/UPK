import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";

const HalPertama = () => {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">Profil</h1>
                    <p className="text-gray-600 p-4">Halaman Data Profil</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Input data guru</th>
                                    <th className="px-4 py-2 border">Input data siswa</th>
                                    <th className="px-4 py-2 border">Input data jumlah prestasi</th>
                                    <th className="px-4 py-2 border">Input data jumlah Ekstrakulikuler</th>
                                    <th className="px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border">1</td>
                                    <td className="px-4 py-2 border">27</td>
                                    <td className="px-4 py-2 border">270</td>
                                    <td className="px-4 py-2 border">10</td>
                                    <td className="px-4 py-2 border">6</td>
                                    <td className="px-4 py-2 border">
                                        <Link href="/Admin/Profile_admin/update_admin">
                                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                Update
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};

export default HalPertama;