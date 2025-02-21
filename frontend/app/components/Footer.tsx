'use client';
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="container mx-auto text-center my-6">
                <div className="bg-green-500 text-white px-4 py-2 inline-block rounded-t-lg text-lg font-semibold">
                    Sosial Media Kami:
                </div>
            </div>
            <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 w-full">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-center md:text-left">
                    {/* <!-- Bagian Telepon --> */}
                    <div className="flex items-center space-x-2 my-2 ml-7">
                        <i className="fa-solid fa-phone text-green-400"></i>
                        <span>(0341)368086</span>
                    </div>
                    {/* <!-- Bagian Alamat --> */}
                    <div className="items-center justify-center my-2 w-full md:w-auto ml-80">
                        <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>
                        <span className="max-w-md text-justify md:text-center" >
                            Jl. Kolonel Sugiono VIII No.82, Ciptomulyo, Kec. Sukun, Kota Malang, Jawa Timur
                        </span>
                    </div>
                    <div className="ml-52">
                        {/* <!-- Bagian Sosial Media --> */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 my-2">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 my-2">
                                <Link href="https://www.instagram.com/smppgri6malang" target="_blank" rel="noopener nore ferrer">
                            <div className="flex items-center space-x-2">
                                <i className="fab fa-instagram text-pink-400"></i>
                                <span>@smppgri6malang</span>
                            </div>
                            </Link>
                            <Link href="https://www.tiktok.com/@sprinam_official" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center space-x-2">
                                <i className="fab fa-tiktok text-white"></i>
                                <span>@sprinam_official</span>
                            </div>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
