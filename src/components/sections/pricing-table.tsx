"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

type BillingCycle = "monthly" | "annual";

const pricingData = {
    monthly: [
        {
            name: "Growth",
            price: "87",
            originalPrice: "97",
            offerText: "Oferta limitada: R$ 97 por R$ 87",
            billingText: "Cobrado mês a mês",
            description: "Para quem quer previsibilidade e performance no player com foco no essencial.",
            checkoutUrl: "https://pay.hotmart.com/L81509879J?off=9ls58xw5&checkoutMode=10&utm_source=organicjLj698ea8526e01f61009f4cb5c&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&bid=1770969217857",
            features: [
                { text: "5 vídeos" },
                { text: "Análise de dados" },
                { text: "Gráfico de retenção" },
                { text: "Botão de delay" },
                { text: "Controles de vídeo" },
                { text: "Barra fictícia" },
                { text: "Smart Autoplay" },
                { text: "Thumbnails (capa e pause)" },
                { text: "Teste A/B de Vídeo", badge: "NOVO" },
                { text: "Simulador de Views ao Vivo", badge: "NOVO" },
                { text: "Análise de Pitch", badge: "NOVO" },
                { text: "Suporte WhatsApp" },
            ],
            highlight: false,
        },
        {
            name: "Pro",
            price: "97",
            originalPrice: "147",
            offerText: "Oferta limitada: R$ 147 por R$ 97",
            billingText: "Cobrado mês a mês",
            description: "Para quem roda tráfego pesado e quer o player no limite: sem trava, sem teto.",
            checkoutUrl: "https://pay.hotmart.com/L81509879J?off=qbwcg3gv&checkoutMode=10&utm_source=organicjLj698ea8526e01f61009f4cb5c&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR",
            features: [
                { text: "Vídeos ILIMITADOS" },
                { text: "Largura de banda ILIMITADA" },
                { text: "Cliques ILIMITADOS" },
                { text: "Análise de dados" },
                { text: "Gráfico de retenção" },
                { text: "Botão de delay" },
                { text: "Controles de vídeo" },
                { text: "Barra fictícia" },
                { text: "Smart Autoplay" },
                { text: "Thumbnails (capa e pause)" },
                { text: "Bordas" },
                { text: "Pixel", badge: "NOVO" },
                { text: "Teste A/B de Vídeo", badge: "NOVO" },
                { text: "Simulador de Views ao Vivo", badge: "NOVO" },
                { text: "Análise de Pitch", badge: "NOVO" },
                { text: "Filtro de Tráfego", badge: "NOVO" },
                { text: "Teste A/B de Headline", badge: "EM BREVE" },
                { text: "Captura de Lead", badge: "EM BREVE" },
                { text: "VSLQuiz", badge: "EM BREVE" },
                { text: "Simulador de Live", badge: "EM BREVE" },
                { text: "Suporte WhatsApp" },
                { text: "E muito mais" },
            ],
            highlight: true,
        }
    ],
    annual: [
        {
            name: "Growth",
            price: "53,99",
            originalPrice: "97",
            discount: "55% OFF",
            offerText: "Melhor Custo-Benefício",
            cashPrice: "R$ 522,00 à vista (de R$ 1.164,00)",
            billingText: "Plano anual com desconto (12x)",
            description: "Para quem quer previsibilidade e performance no player com foco no essencial.",
            checkoutUrl: "https://pay.hotmart.com/L81509879J?off=mknyrw9m&checkoutMode=10&utm_source=organicjLj698ea8526e01f61009f4cb5c&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&bid=1770969126997&fromExitPopup=true",
            features: [
                { text: "10 vídeos" },
                { text: "Análise de dados" },
                { text: "Gráfico de retenção" },
                { text: "Botão de delay" },
                { text: "Controles de vídeo" },
                { text: "Barra fictícia" },
                { text: "Smart Autoplay" },
                { text: "Thumbnails (capa e pause)" },
                { text: "Teste A/B de Vídeo", badge: "NOVO" },
                { text: "Simulador de Views ao Vivo", badge: "NOVO" },
                { text: "Análise de Pitch", badge: "NOVO" },
                { text: "Suporte WhatsApp" },
            ],
            highlight: false,
        },
        {
            name: "Pro",
            price: "60,19",
            originalPrice: "147",
            discount: "67% OFF",
            offerText: "Recomendado",
            cashPrice: "R$ 582,00 à vista (de R$ 1.764,00)",
            billingText: "Plano anual com desconto (12x)",
            description: "Para quem roda tráfego pesado e quer o player no limite: sem trava, sem teto.",
            checkoutUrl: "https://pay.hotmart.com/L81509879J?off=zkhuhluo&checkoutMode=10&utm_source=organicjLj698ea8526e01f61009f4cb5c&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organicjLj698ea8526e01f61009f4cb5chQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxRe",
            features: [
                { text: "Vídeos ILIMITADOS" },
                { text: "Largura de banda ILIMITADA" },
                { text: "Cliques ILIMITADOS" },
                { text: "Análise de dados" },
                { text: "Gráfico de retenção" },
                { text: "Botão de delay" },
                { text: "Controles de vídeo" },
                { text: "Barra fictícia" },
                { text: "Smart Autoplay" },
                { text: "Thumbnails (capa e pause)" },
                { text: "Bordas" },
                { text: "Pixel", badge: "NOVO" },
                { text: "Teste A/B de Vídeo", badge: "NOVO" },
                { text: "Simulador de Views ao Vivo", badge: "NOVO" },
                { text: "Análise de Pitch", badge: "NOVO" },
                { text: "Filtro de Tráfego", badge: "NOVO" },
                { text: "Teste A/B de Headline", badge: "EM BREVE" },
                { text: "Captura de Lead", badge: "EM BREVE" },
                { text: "VSLQuiz", badge: "EM BREVE" },
                { text: "Simulador de Live", badge: "EM BREVE" },
                { text: "Suporte WhatsApp" },
                { text: "E muito mais" },
            ],
            highlight: true,
        }
    ]
};

export function PricingTable() {
    const [cycle, setCycle] = useState<BillingCycle>("annual");

    return (
        <section id="planos" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-bold mb-3 uppercase tracking-widest text-sm">Planos</p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#000C39] mb-6">Pronto para Começar Grátis?</h2>

                    {/* Toggle Cycle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={cn("text-lg font-bold transition-colors", cycle === "monthly" ? "text-[#000C39]" : "text-gray-400")}>Mensal</span>
                        <button
                            onClick={() => setCycle(cycle === "monthly" ? "annual" : "monthly")}
                            className="relative w-16 h-8 bg-indigo-600 rounded-full p-1 transition-all"
                        >
                            <motion.div
                                animate={{ x: cycle === "annual" ? 32 : 0 }}
                                className="w-6 h-6 bg-white rounded-full shadow-md"
                            />
                        </button>
                        <span className={cn("text-lg font-bold transition-colors flex items-center gap-2", cycle === "annual" ? "text-[#000C39]" : "text-gray-400")}>
                            Anual
                            <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-black animate-pulse shadow-sm">Até 67% OFF</span>
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pricingData[cycle].map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "relative bg-white rounded-3xl p-6 md:p-10 border-2 transition-all duration-500 flex flex-col group",
                                plan.highlight
                                    ? "border-[#FAD02E] shadow-[0_20px_80px_rgba(250,208,46,0.15)] z-10 scale-100 md:scale-105"
                                    : "border-gray-100 hover:border-blue-200 hover:shadow-xl"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FAD02E] text-[#000C39] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-yellow-500/20">
                                    MAIS POPULAR
                                </div>
                            )}

                            <div className="mb-6 md:mb-8">
                                <div className="flex justify-between items-start mb-4 md:mb-6">
                                    <h3 className="text-2xl md:text-3xl font-black text-[#000C39]">{plan.name}</h3>
                                    {cycle === "annual" && (
                                        <span className="bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-black px-2 md:px-3 py-1 rounded-lg uppercase border border-indigo-100 shadow-sm">
                                            {(plan as any).discount}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2 tabular-nums">
                                    <span className="text-lg md:text-xl text-gray-400 font-black opacity-40">R$</span>
                                    <span className="text-5xl md:text-7xl font-black text-[#000C39] tracking-tighter">
                                        {cycle === "monthly" ? (
                                            <AnimatedCounter value={Number(plan.price.replace(',', '.'))} />
                                        ) : (
                                            <AnimatedCounter value={Number(plan.price.replace(',', '.'))} />
                                        )}
                                    </span>
                                    <span className="text-sm md:text-base text-gray-400 font-bold opacity-60">/mês</span>
                                </div>

                                {cycle === "monthly" ? (
                                    <div className="space-y-3 min-h-[60px]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400 line-through font-medium">De R$ {plan.originalPrice}</span>
                                            <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Economize R$ {Number(plan.originalPrice) - Number(plan.price)}</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-50 border border-orange-100">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                            </span>
                                            <p className="text-xs text-orange-700 font-bold uppercase tracking-wider">{(plan as any).offerText}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold">{plan.billingText}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 min-h-[60px]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400 line-through font-medium">De R$ {plan.name === "Growth" ? "1.164,00" : "1.764,00"}</span>
                                            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Melhor Escolha Anual</span>
                                        </div>
                                        <p className="text-sm text-indigo-600 font-black">{(plan as any).cashPrice}</p>
                                        <p className="text-xs text-gray-400 font-bold">{plan.billingText}</p>
                                    </div>
                                )}
                                <p className="mt-8 text-gray-500 text-sm leading-relaxed font-medium">
                                    {plan.description}
                                </p>
                            </div>

                            <Button
                                className={cn(
                                    "w-full py-8 text-lg font-black mb-10 transition-all rounded-2xl uppercase tracking-widest text-white border-none",
                                    plan.highlight
                                        ? "bg-[#22C55E] hover:bg-[#16a34a] shadow-xl shadow-green-500/20 hover:scale-[1.02]"
                                        : "bg-[#000C39] hover:bg-blue-900 hover:scale-[1.02]"
                                )}
                                asChild
                            >
                                <a href={(plan as any).checkoutUrl} target="_blank" rel="noopener noreferrer">
                                    TESTE POR 7 DIAS GRÁTIS
                                </a>
                            </Button>

                            <div className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-green-50 rounded-full border border-green-100/50 shadow-sm transition-transform hover:scale-110">
                                            <Check className="w-3.5 h-3.5 text-green-600 stroke-[3px]" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                            {feature.text}
                                            {feature.badge && (
                                                <span className={cn(
                                                    "text-[8px] font-black px-1.5 py-0.5 rounded tracking-tighter",
                                                    feature.badge === "NOVO" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                                                )}>
                                                    {feature.badge}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dashboards visuals removed */}

            </div>
        </section>
    );
}
