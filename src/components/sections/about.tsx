"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function About() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row-reverse items-center gap-16 max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            Sobre nós
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#000C39] mb-8 leading-tight">
                            O VSLPLAY foi construído para gerar conversões ao seu produto
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                            <p>
                                O VSLPLAY é uma ferramenta especializada em aumentar a taxa de conversão de vendas. Se você tem dificuldade em identificar quais partes do seu vídeo estão afetando suas conversões, o VSLPLAY pode ajudar.
                            </p>
                            <p>
                                Diferente de outros players de vídeo, o VSLPLAY oferece dados valiosos sobre seus espectadores, como idade, gênero, cidade e dispositivo, independente do tipo de tráfego que você possui.
                            </p>
                            <p className="font-medium text-[#000C39]">
                                Com essas informações, você pode tomar decisões estratégicas para expandir seus negócios e melhorar suas conversões. Experimente agora mesmo todas as funcionalidades exclusivas que o VSLPLAY tem a oferecer!
                            </p>
                        </div>

                        <Button size="lg" className="px-10 py-7 text-xl font-extrabold shadow-2xl shadow-[#9D50BB]/20 bg-[#9D50BB] hover:bg-[#833da1] transition-all hover:scale-105 uppercase tracking-wide border-none text-white" asChild>
                            <a href="#planos">Começar Grátis</a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="relative w-full aspect-[418/637] max-w-md mx-auto drop-shadow-2xl">
                            <Image
                                src="/assets/misc/img1.webp"
                                alt="Dados e Conversão"
                                fill
                                className="object-cover rounded-[40px]"
                            />
                            {/* Optional secondary image overlay if applicable */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 drop-shadow-xl hidden md:block">
                                <Image src="/assets/misc/img1-1.webp" alt="UI Element" fill className="object-cover rounded-[40px]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
