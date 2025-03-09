import Footer from "@/components/Footer"
import Header from "@/components/Header"

const Paskibra = () => {
    return (
        <>
            <Header />
            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                <img src="/images/img-UPK/paskibra.jpg"
                                    alt="tim Ekstrakurikuler pramuka" />
                            </div>
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-center md:text-left">paskibra (SPRINAM)</h2>
                                <p className="italic mt-2">
                                    1000 rintangan akan kuhadapi, demi kukibarkan sang merah putih.
                                    Seorang pemenang takkan berhenti berusaha dan orang yang berhenti berusaha takkan bisa menjadi pemenang
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

export default Paskibra