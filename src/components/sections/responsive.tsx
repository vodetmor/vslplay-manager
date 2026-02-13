"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Responsive() {
    return (
        <section className="py-24 bg-[#F8FAFC] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            Responsivo
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#000C39] mb-8 leading-tight">
                            Use de qualquer lugar e aumente conversões
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Com o VSLPLAY, você tem em mãos uma ferramenta totalmente responsiva e poderosa, que permite ajustar seus vídeos de qualquer lugar e a qualquer momento. Basta ter um celular para explorar todas as possibilidades de personalização e inovação que a plataforma oferece.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="relative w-full aspect-[800/862] max-w-lg mx-auto drop-shadow-2xl">
                            <Image
                                src="/assets/misc/vsl-mobile-3.webp"
                                alt="Plataforma Responsiva"
                                fill
                                className="object-contain rounded-[40px]"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
