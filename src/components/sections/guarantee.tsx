"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Guarantee() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">

                    {/* Image Column */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative w-full aspect-[4/3] md:aspect-square max-w-md mx-auto rounded-[40px] overflow-hidden shadow-2xl">
                            {/* Decorative blobs/gradients behind image */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.4, 0.6, 0.4]
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl -z-10"
                            />

                            <Image
                                src="/assets/misc/img2.webp"
                                alt="Garantia de 7 Dias"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-1/2 text-left">
                        <p className="text-blue-600 font-semibold mb-2 uppercase tracking-wide">Garantia</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#000C39] mb-6">
                            7 dias de Garantia
                        </h2>

                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                O Prazo de Garantia é o período que você tem para pedir o reembolso integral do valor pago pela sua compra, caso o produto não seja satisfatório.
                            </p>
                            <p>
                                Assim que solicitado, seu reembolso é processado automaticamente pela Hotmart em até 5 dias. Para pagamentos com boleto bancário, você precisa preencher uma conta bancária para receber o dinheiro.
                            </p>
                            <p>
                                Passados os 5 dias, o valor poderá ser identificado em sua conta em até 7 dias úteis. Já o estorno da fatura do cartão de crédito varia de acordo com o meio de pagamento e pode ocorrer na fatura atual ou na seguinte.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Button size="lg" className="px-8 py-6 text-lg font-bold shadow-xl shadow-blue-600/20 bg-[#00D2FF] hover:bg-[#00b8e6] transition-all hover:scale-105 border-none text-white" asChild>
                                <a href="#planos">
                                    COMEÇAR GRÁTIS
                                </a>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
