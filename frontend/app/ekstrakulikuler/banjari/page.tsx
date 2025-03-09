import Footer from "@/components/Footer"
import Header from "@/components/Header"

const Banjari = () => {
    return (
        <>
            <Header />

            <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                <img src="/images/img-UPK/banjari.jpg"
                                    alt="tim Ekstrakurikuler pramuka" />
                            </div>
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-center md:text-left">Banjari (SPRINAM)</h2>
                                <p className="italic mt-2">
                                    Ketukan rebana bukan sekadar irama, tapi juga wujud cinta pada Rasulullah SAW
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

export default Banjari