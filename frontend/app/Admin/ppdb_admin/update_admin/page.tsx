import Sidebar from "@/app/components/Sidebar"

const Page = () => {
    return (
        <>
        <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="w-4/5 p-8 bg-white rounded-lg shadow-lg m-4">
            <h1 className="text-2xl font-bold">PPDB</h1>
            <p className="text-gray-600">Selamat Datang di Halaman Update Data PPDB</p>
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
                    <label className="block text-gray-700">Input nama guru</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="input-container mb-4">
                    <label className="block text-gray-700">Input nomor guru</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded" />
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