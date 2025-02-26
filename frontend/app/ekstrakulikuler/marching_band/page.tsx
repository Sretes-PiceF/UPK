import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"

const Marching = () => {
    return (
        <>
            <Header />

            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                <img src="/images/img-UPK/marching_band.jpg" alt="Tim Marching band" className="rounded-lg shadow-md w-full md:w-[600px] h-[400px] object-cover" />
                            </div>
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-center md:text-left">Marcing Band (SPRINAM)</h2>
                                <p className="italic mt-2">
                                    Dalam drumband, kita bekerja sama untuk menghasilkan penampilan yang harmonis,
                                    mengajarkan pentingnya kerjasama, komunikasi, dan saling mendukung.
                                    Melalui penampilan di depan umum, Kita dapat mengatasi rasa gugup, meningkatkan rasa percaya diri,
                                    dan mengasah kemampuan tampil di depan banyak orang.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default Marching