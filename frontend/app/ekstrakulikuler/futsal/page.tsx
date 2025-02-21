import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"

const Futsal = () => {
    return(
        <>
        <Header />

        <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        <section className="container mx-auto my-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Gambar */}
            <div className="flex justify-center">
              <img
                src="/images/img-upk/futsal.jpg" alt="Tim Futsal SPRINAM" className="rounded-lg shadow-md w-full md:w-[600px] h-[400px] object-cover" />
            </div>

            {/* Deskripsi */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-center md:text-left">Futsal (SPRINAM)</h2>
              <p className="italic mt-2">
                Di lapangan futsal kita bertahan untuk mencetak gol, di sekolah kita belajar untuk
                mengatasi tantangan, beradaptasi, dan meraih impian.
              </p>
              <hr className="my-4 border-gray-400" />
              <p className="text-sm font-semibold text-gray-700 text-center md:text-left">
                Ingat, dalam kehidupan kegagalan bukanlah akhir, melainkan kunci menuju kesuksesan.
                Salam dari kami SMP PGRI 6 Malang.
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

export default Futsal