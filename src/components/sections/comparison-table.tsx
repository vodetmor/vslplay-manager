"use client";

import { Check, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const comparisonData = [
    {
        name: "Concorrente V***B",
        type: "Cobra por play",
        monthly: "R$ 597,00",
        annual: "R$ 7.164,00",
        extra: "R$ 1.000,00",
        total: "R$ 8.164,00",
        description: "Cobra R$0,02 por play extra. Quanto mais você performa, mais paga.",
        isPositive: false,
    },
    {
        name: "VSLPlay",
        type: "Sem cobrança por plays/banda",
        monthly: "R$ 60,19",
        annual: "R$ 582,00",
        extra: "R$ 0,00",
        total: "R$ 582,00",
        description: "Vídeos ilimitados, sem taxa por clique, analytics de retenção e focado em conversão.",
        isPositive: true,
        highlight: true,
    },
    {
        name: "Concorrente P***A",
        type: "Cobra por banda",
        monthly: "R$ 387,90",
        annual: "R$ 4.654,80",
        extra: "R$ 1.500,00",
        total: "R$ 6.154,80",
        description: "Cobra por armazenamento e largura de banda. Custo pode variar com picos.",
        isPositive: false,
    }
];

export function ComparisonTable() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-blue-600 font-black mb-3 uppercase tracking-widest text-sm text-center">ROI & Desparidade</p>
                        <h2 className="text-4xl md:text-5xl font-black text-[#000C39] mb-6">
                            Cenário real com 100.000 plays/ano
                        </h2>
                        <p className="text-lg text-gray-500 font-medium">
                            O VSLPlay não cobra por plays ou largura de banda. Compare os custos reais abaixo.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
                    {comparisonData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: item.highlight ? 1.05 : 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: i * 0.1
                            }}
                            whileHover={{ y: item.highlight ? 0 : -5 }}
                            className={cn(
                                "flex-1 relative p-8 md:p-14 rounded-[40px] border-2 transition-all duration-500 flex flex-col items-center lg:items-stretch",
                                item.highlight
                                    ? "bg-white text-[#000C39] border-[#FAD02E] shadow-[0_20px_80px_rgba(250,208,46,0.15)] z-10 scale-105"
                                    : "bg-gray-50 border-gray-100 grayscale-[0.05] opacity-100 scale-95 hover:grayscale-0 lg:my-8"
                            )}
                        >
                            {item.highlight && (
                                <motion.div
                                    animate={{ opacity: [0.03, 0.05, 0.03] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-blue-50/20 rounded-[40px] pointer-events-none"
                                />
                            )}
                            {item.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FAD02E] text-[#000C39] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-yellow-500/20 z-20 whitespace-nowrap">
                                    MELHOR ESCOLHA
                                </div>
                            )}

                            <div className={cn(
                                "flex flex-col mb-10 w-full relative z-10 pt-12",
                                item.highlight ? "items-center" : "items-center lg:items-start"
                            )}>
                                <h3 className={cn(
                                    "text-2xl font-black mb-1 tracking-tight text-center",
                                    item.highlight ? "text-[#000C39] text-3xl" : "text-[#6A7282] font-bold lg:text-left w-full"
                                )}>{item.name}</h3>
                                <p className={cn(
                                    "text-sm font-bold text-center",
                                    item.highlight ? "text-blue-500" : "text-gray-400 lg:text-left w-full"
                                )}>{item.type}</p>
                            </div>

                            <div className="space-y-10 mb-10 w-full relative z-10">
                                <div className="text-center pt-4">
                                    <p className={cn(
                                        "text-[10px] uppercase font-black mb-4 tracking-widest",
                                        item.highlight ? "text-black" : "text-[#6A7282]"
                                    )}>Investimento Total Estimado</p>
                                    <div className={cn(
                                        "inline-flex items-baseline justify-center gap-1 tabular-nums transition-all",
                                        item.highlight ? "text-[#000C39] drop-shadow-sm scale-110" : "text-[#6A7282] font-black scale-95"
                                    )}>
                                        <span className={cn("text-2xl font-black", item.highlight ? "opacity-60" : "opacity-100")}>R$</span>
                                        <span className="text-5xl md:text-7xl font-black tracking-tighter">
                                            {item.total.replace('R$ ', '')}
                                        </span>
                                    </div>
                                </div>

                                <div className={cn(
                                    "flex flex-col sm:flex-row justify-between items-center sm:items-end border-b pb-10 gap-6 sm:gap-0",
                                    item.highlight ? "border-blue-50" : "border-gray-200"
                                )}>
                                    <div className="text-center sm:text-left">
                                        <p className={cn(
                                            "text-[10px] uppercase font-black mb-1 tracking-widest",
                                            item.highlight ? "text-black" : "text-[#6A7282]"
                                        )}>Custo Mensal</p>
                                        <p className={cn(
                                            "text-lg font-black",
                                            item.highlight ? "text-[#000C39]" : "text-[#6A7282]"
                                        )}>{item.monthly}</p>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <p className={cn(
                                            "text-[10px] uppercase font-black mb-1 tracking-widest",
                                            item.highlight ? "text-black" : "text-[#6A7282]"
                                        )}>Custo Anual</p>
                                        <p className={cn(
                                            "text-base font-black",
                                            item.highlight ? "text-[#000C39]" : "text-[#6A7282]"
                                        )}>{item.annual}</p>
                                    </div>
                                </div>

                                <div className={cn(
                                    "flex justify-between items-center p-6 rounded-2xl",
                                    item.highlight ? "bg-blue-50/50 border border-blue-100/50 shadow-inner" : "bg-gray-100/50"
                                )}>
                                    <p className={cn("text-xs font-black uppercase tracking-wider opacity-40", item.highlight ? "text-blue-900" : "text-gray-400")}>Taxas Extras</p>
                                    <p className={cn(
                                        "text-lg font-black",
                                        item.isPositive ? "text-blue-600" : "text-red-600"
                                    )}>
                                        {item.extra}
                                    </p>
                                </div>
                            </div>

                            {!item.highlight && (
                                <p className="text-sm leading-relaxed font-medium min-h-[60px] text-center lg:text-left text-gray-400 font-light italic mb-8">
                                    {item.description}
                                </p>
                            )}

                            {item.highlight && (
                                <div className="mt-2 flex flex-col gap-6 bg-blue-50/30 p-8 rounded-[32px] border border-blue-100/50 relative z-10">
                                    {[
                                        "Vídeos ilimitados",
                                        "Sem taxa por clique",
                                        "Melhor ROI do Mercado"
                                    ].map((benefit, bIndex) => (
                                        <div key={bIndex} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-50 rounded-full border border-green-100/50 shadow-sm transition-transform hover:scale-110">
                                                <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                                            </div>
                                            <span className="leading-none">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
