"use client";

import { Button } from "@/components/ui/button";
import { VSLPlayer } from "./vsl-player";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-white">
            {/* Premium Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/20 rounded-full blur-[120px] opacity-70"
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-blue-50/50 to-white rounded-full blur-[120px] opacity-70"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            O Player Nº1 para Marketing Digital
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#000C39] mb-4 md:mb-6 leading-[1.2] md:leading-[1.15]">
                            Player de vídeo com largura <br className="hidden md:block" />
                            de banda e <span className="text-blue-600">cliques ilimitados</span>
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-10 font-medium max-w-2xl mx-auto px-4">
                            O Player de vídeo sem complicação.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="max-w-5xl mx-auto perspective-1000"
                >
                    <motion.div
                        whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,12,57,0.15)] overflow-hidden bg-white p-2 md:p-4 rotate-x-1"
                    >
                        <VSLPlayer videoId="10144c8c-f331-4731-bbee-3dc307b200fd" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="px-8 py-6 text-lg font-black shadow-xl shadow-blue-600/20 bg-[#00D2FF] hover:bg-[#00b8e6] transition-all border-none text-white uppercase tracking-widest" asChild>
                                <a href="#planos">
                                    TESTE GRÁTIS
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <div className="mt-16 text-center max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-[#000C39] mb-6">
                            Não cobramos por cliques nem por excesso de banda.
                        </h3>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium">
                            Experimente o VSLPLAY gratuitamente! Configure e personalize seu player com facilidade, sem precisar de conhecimento técnico. Compatível com links do YouTube e arquivos MP4.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
