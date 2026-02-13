"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Nathália",
        role: "VSL Play",
        image: "nathalia.webp",
        text: "“Foi bem fácil de configurar, coisa de 5 minutos, e o suporte é muito rápido e ajudou demais também na explicação. Assim que realizei a compra o suporte já entrou em contato para auxiliar! Muito bom!”",
    },
    {
        name: "Wellington",
        role: "VSL Play",
        image: "wellington.webp",
        text: "“Muito boa a plataforma, estou muito feliz!”",
    },
    {
        name: "Sabrina",
        role: "Gerente de Marketing",
        image: "sabrina.webp",
        text: "“Eu tô adorando a ferramenta, tá me ajudando muito aqui na minha operação. Fiquei muito feliz em encontrar a mesma no Google, agora é só alegria. Recomendo a todos!”",
    },
    {
        name: "Gabriel",
        role: "Gestor Web",
        image: "gabriel.webp",
        text: "“Foi a melhor experiencia que tive em hospedar minha VSL, minhas conversões aumentaram muito!!!”",
    },
    {
        name: "Alejandro",
        role: "VSL Play",
        image: "vslplay-review.webp",
        text: "“Suporte simplesmente perfeito, assim que a compra é feita eles mesmo entram em contato com vc para te dar tdo suporte que precisar dentro da plataforma deles. Plataforma facil de mecher e atendeu minha espectativas. Estão de parabéns!!”",
    },
    {
        name: "Mais Ltda",
        role: "Empresa",
        image: "vslplay-review.webp",
        text: "“Ferramenta Excelente! Muito boa e o suporte é surreal! muito bom Recomendo a todos!”",
    },
    {
        name: "Ticiane",
        role: "Empreendedora Digital",
        image: "vslplay-review.webp",
        text: "“Tem tudo que preciso e o suporte é impecável,todas as vezes que precisei fui orientada corretamente!!!”",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-blue-600 font-semibold mb-2">Depoimentos</p>
                    <h2 className="text-4xl font-bold text-[#000C39] mb-8">Feedbacks dos nossos clientes</h2>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="relative h-12 w-64">
                            <Image src="/assets/misc/depoimentos.webp" alt="Usuarios Satisfeitos" fill className="object-contain" />
                        </div>
                        <p className="font-bold text-[#000C39]">+2000 <span className="font-normal text-gray-500">Usuarios satisfeitos</span></p>
                    </div>
                </motion.div>

                {/* Marquee Effect for Testimonials */}
                <div className="relative w-full overflow-hidden mask-linear-fade">
                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{
                            x: [0, -1500],
                        }}
                        transition={{
                            x: {
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="flex-shrink-0 w-[350px] bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                        <Image
                                            src={`/assets/testimonials/${t.image}`}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#000C39]">{t.name}</h4>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm italic leading-relaxed">
                                    {t.text}
                                </p>
                                <div className="flex gap-1 mt-4">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="w-4 h-4 text-[#FAD02E] fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <style jsx>{`
            .mask-linear-fade {
                 mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
        `}</style>
            </div>
        </section>
    );
}
