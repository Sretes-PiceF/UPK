import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"

const Halpertama = () => {
    return (
        <>
    <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">Ekstrakulikuler</h1>
                    <p className="text-gray-600 p-4">Halaman Data Ekstrakulikuler</p>
                    <Link href="/Admin/ekstrakulikuler_admin/store_admin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
                            Tambah Data
                        </button>
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">Deskripsi</th>
                                    <th className="px-4 py-2 border">Gambar</th>
                                    <th className="px-4  py-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border">1</td>
                                    <td className="px-4 py-2 border">Halo halo hai</td>
                                    <td className="px-4 py-2 border">Files.jpg</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex space-x-2">
                                        <Link href="/Admin/ekstrakulikuler_admin/update_admin">
                                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                                                Update
                                            </button>
                                        </Link>
                                        <Link href="/buku/edit/1">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
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

export default Halpertama