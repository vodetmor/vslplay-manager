"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
    {
        title: "Gráfico de Retenção",
        description: "Identifique exatamente em qual ponto do seu vídeo seus espectadores perdem o interesse. Corrija quedas e aumente as vendas.",
        gif: "Grafico-de-Retencao.gif",
    },
    {
        title: "Barra de Progresso Fictícia",
        description: "Melhore a retenção dando a impressão de que o vídeo é mais curto, aumentando o engajamento imediato.",
        gif: "Barra-de-Progresso.gif",
    },
    {
        title: "Smart Autoplay",
        description: "Crie urgência com o vídeo parecendo já estar em andamento. Ao clicar, ele reinicia do zero automaticamente.",
        gif: "Smart-Autoplay-.gif",
    },
    {
        title: "Thumbnails Dinâmicas",
        description: "Exiba capas persuasivas ao pausar o vídeo ou antes do carregamento, mantendo o lead focado na oferta.",
        gif: "Thumbnails.gif",
    },
    {
        title: "Aparência Personalizada",
        description: "Customize as cores e o estilo do player para combinar perfeitamente com a identidade visual da sua marca.",
        gif: "Aparencia-.gif",
    },
    {
        title: "Botão com Delay",
        description: "Configure botões de checkout para aparecerem exatamente no pitch de vendas, maximizando cliques quentes.",
        gif: "Botao-.gif",
    },
    {
        title: "Controles Totais",
        description: "Escolha o que mostrar: play/pause, volume, barra de tempo ou esconda tudo para focar apenas na VSL.",
        gif: "Controles.gif",
    },
    {
        title: "Continue Assistindo",
        description: "Retenha o espectador permitindo que ele continue de onde parou em uma visita de retorno à página.",
        gif: "Continue-Assistindo-.gif",
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-blue-600 font-black mb-3 uppercase tracking-widest text-sm">Recursos</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#000C39]">
                            Recursos exclusivos no player
                        </h2>
                        <p className="text-lg text-gray-500 font-medium">
                            Veja como funciona o VSLPLAY por dentro e como vamos te ajudar a faturar mais com seus vídeos
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                    className="space-y-32 max-w-7xl mx-auto"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={cn(
                                "flex flex-col items-center gap-12 md:gap-20",
                                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            )}
                        >
                            {/* Text Content */}
                            <div className="w-full md:w-5/12 text-center md:text-left">
                                <div className={cn(
                                    "inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 font-black text-xl text-white shadow-lg",
                                    i % 3 === 0 ? "bg-[#00D2FF]" : i % 3 === 1 ? "bg-[#9D50BB]" : "bg-[#FAD02E]"
                                )}>
                                    {i + 1}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-[#000C39] mb-6 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>

                            {/* GIF Display */}
                            <div className="w-full md:w-7/12 relative">
                                <motion.div
                                    whileHover={{ perspective: 1000, rotateY: i % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={cn(
                                        "relative w-full aspect-video rounded-[40px] overflow-hidden shadow-[0_30px_70px_rgba(0,12,57,0.15)] bg-white border-8 transition-transform duration-500",
                                        i % 3 === 0 ? "border-[#00D2FF]/5" : i % 3 === 1 ? "border-[#9D50BB]/5" : "border-[#FAD02E]/5"
                                    )}
                                >
                                    <Image
                                        src={`/assets/features/${feature.gif}`}
                                        alt={feature.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />

                                    {/* Decorative Elements */}
                                    <div className={cn(
                                        "absolute -z-10 -top-8 -right-8 w-64 h-64 rounded-full blur-[100px] opacity-30",
                                        i % 3 === 0 ? "bg-[#00D2FF]" : i % 3 === 1 ? "bg-[#9D50BB]" : "bg-[#FAD02E]"
                                    )} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
