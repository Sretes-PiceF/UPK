import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"

const HalPertama = () => {
    return (
        <>
        <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">Prestasi</h1>
                    <p className="text-gray-600 p-4">Halaman Update Data Prestasi</p>
                    <Link href="/Admin/prestasi_admin/store_admin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                            Tambah Data
                        </button>
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Judul Juara</th>
                                    <th className="px-4 py-2 border">Nama</th>
                                    <th className="px-4 py-2 border">Deskripsi</th>
                                    <th className="px-4 py-2 border">Gambar</th>
                                    <th className="px-4 py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border">1</td>
                                    <td className="px-4 py-2 border">Juara 1</td>
                                    <td className="px-4 py-2 border">Mohammad Zulkipli</td>
                                    <td className="px-4 py-2 border">Dia pemenang efootball-priode 2024 u-12</td>
                                    <td className="px-4 py-2 border">Files.jpg</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex space-x-2">
                                        <Link href="/Admin/prestasi_admin/update_admin">
                                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                Update
                                            </button>
                                        </Link>
                                        <Link href="/buku/edit/1">
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
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