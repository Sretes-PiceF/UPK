import Sidebar from "@/components/Sidebar"

const Page = () => {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
                    <h1 className="text-2xl font-bold">EKSTRAKULIKULER</h1>
                    <p className="text-gray-600">Halaman Update Data Ekstrakulikuler</p>
                    <div className="card p-4 bg-gray-50 rounded-lg shadow">
                        <div className="input-container mb-4">
                            <label className="block text-gray-700">Input data images</label>
                            <input type="file" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="input-container mb-4">
                            <label className="block text-gray-700">Input deskripsi</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="input-container mb-4">
                            <label className="block text-gray-700">Input data siswa</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                    </div>
                    <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">Update</button>
                    <p className="mt-4 text-green-600 font-medium"></p>
                </main>
            </div>
        </>
    )
}

export default Page