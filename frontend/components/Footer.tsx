'use client';
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="container mx-auto text-center my-4 md:my-6 px-4">
                <div className="bg-green-500 text-white px-4 py-2 inline-block rounded-t-lg text-base md:text-lg font-semibold">
                    Sosial Media Kami:
                </div>
            </div>

            <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 md:py-6 w-full">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-3 md:gap-0">
                    {/* Phone Section */}
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                        <i className="fa-solid fa-phone text-green-400"></i>
                        <span>(0341) 368086</span>
                    </div>

                    {/* Address Section */}
                    <div className="flex items-center justify-center space-x-2 md:ml-44">
                        <i className="fas fa-map-marker-alt text-red-400"></i>
                        <span className="text-sm md:text-base whitespace-nowrap">
                            Jl. Kolonel Sugiono VIII No.82, Ciptomulyo, Kec. Sukun
                        </span>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6">
                        <Link
                            href="https://www.instagram.com/smppgri6malang"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        >
                            <i className="fab fa-instagram text-pink-400"></i>
                            <span className="text-sm md:text-base">@smppgri6malang</span>
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@sprinam_official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        >
                            <i className="fab fa-tiktok text-white"></i>
                            <span className="text-sm md:text-base">@sprinam_official</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}