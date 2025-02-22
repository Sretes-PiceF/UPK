import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"
const HalPertama = () => {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">PPDB</h1>
                    <p className="text-gray-600 p-4">Halaman Data PPDB</p>
                    <Link href="/Admin/ppdb_admin/store_admin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                            Tambah Data
                        </button>
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Deskripsi 1</th>
                                    <th className="px-4 py-2 border">Deskripsi 2</th>
                                    <th className="px-4 py-2 border">Nama Guru</th>
                                    <th className="px-4 py-2 border">No Guru</th>
                                    <th className="px-4 py-2 border">Gambar</th>
                                    <th className="px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border">1</td>
                                    <td className="px-4 py-2 border">Ada info penting kah sekarang???</td>
                                    <td className="px-4 py-2 border">Yukk!!! JOIN ke SPRINAM malang sekolah hebat</td>
                                    <td className="px-4 py-2 border">Pak yayang</td>
                                    <td className="px-4 py-2 border">0987654098</td>
                                    <td className="px-4 py-2 border">Files.jpg</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex space-x-2"> {/* Flexbox container */}
                                            <Link href="/Admin/ppdb_admin/update_admin">
                                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                    Update
                                                </button>
                                            </Link>
                                            <Link href="/buku/delete/1">
                                                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                                    Hapus
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    )
}

export default HalPertama