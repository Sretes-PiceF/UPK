import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"

const Pramuka = () => {
    return (
        <>
            <Header />
            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                <img src="/images/img-UPK/pramuka.jpg"
                                    alt="tim Ekstrakurikuler pramuka" />
                            </div>
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-center md:text-left">pramuka (SPRINAM)</h2>
                                <p className="italic mt-2">
                                    Pramuka mengajarkan kemandirian, disiplin, kerja sama, dan jiwa kepemimpinan. Dengan semangat pantang menyerah dan kebersamaan,
                                    setiap anggota belajar untuk menjadi pribadi yang tangguh, bertanggung jawab, dan siap menghadapi tantangan hidup.
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

export default Pramuka