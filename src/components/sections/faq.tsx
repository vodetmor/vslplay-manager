"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Image from "next/image";

const faqs = [
    {
        question: "Haverá cobrança extra por uso de banda ou cliques?",
        answer: "Não cobramos por CLIQUES e nem LARGURA DE BANDA. Não precisa se preocupar com surpresas desagradáveis na sua fatura de hospedagem de vídeos. Ao contrário de outras plataformas, o VSLPLAY não cobra por largura de banda ou armazenamento. Com a gente, você tem a garantia de que não haverá custos adicionais, mesmo que suas visualizações aumentem."
    },
    {
        question: "O VSLPLAY é fácil de usar?",
        answer: "Com certeza! Nós desenvolvemos um design moderno e limpo, o que torna possível o uso da nossa plataforma tanto em computadores quanto em dispositivos móveis(celular)."
    },
    {
        question: "O VSLPLAY é responsivo?",
        answer: "Sim. Além de ser responsivo, ele seleciona a qualidade do vídeo automaticamente para manter a maior velocidade de entrega da sua VSL."
    },
    {
        question: "Da para rodar nicho BLACK?",
        answer: "Sim, recomendamos nesse caso sempre uma URL que termine em “.MP4”, seja em sua própria hospedagem ou de terceiros."
    },
    {
        question: "Como sei se vai cair?",
        answer: "VSLPLAY roda em cima do Youtube ou link externo em MP4 para garantir que o seu VSL suporte milhares de acessos simultâneos e nunca saia do ar."
    },
    {
        question: "Como é feito o pagamento?",
        answer: "Para garantir a segurança dos seus pagamentos, utilizamos a plataforma de processamento da “HOTMART”. Ela é altamente avaliada no mercado e oferece um excelente suporte aos usuários. Assim, você pode ter a tranquilidade de que seus dados estão protegidos e suas transações financeiras são seguras."
    },
    {
        question: "Tem atualizações frequentes?",
        answer: "Estamos em constante atualização no VSLPLAY, trazendo sempre novidades para nossos usuários aprimorarem seus players."
    },
    {
        question: "Tem fidelidade ou multa de cancelamento?",
        answer: "No VSLPLAY, queremos garantir que nossos clientes estejam sempre satisfeitos com nossos serviços. Por isso, oferecemos um prazo de 7 dias para cancelamento da assinatura com reembolso total. Se por algum motivo você não estiver satisfeito, é fácil cancelar sua assinatura, sem multa e sem fidelidade. Estamos sempre à disposição para ajudar nossos clientes."
    }
];

export function FAQ() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-semibold mb-2">FAQ</p>
                    <h2 className="text-4xl font-bold text-[#000C39] mb-6">Perguntas Frequentes</h2>
                    <p className="text-gray-600">
                        Ainda com dúvidas? Confira as perguntas mais frequentes da nossa comunidade, e se ainda restar dúvidas, entre em contato com o suporte.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <AccordionItem value={`item-${i}`} className="border-b border-gray-100 group">
                                    <AccordionTrigger className="text-left py-6 text-[#000C39] font-bold text-lg hover:text-blue-600 hover:no-underline transition-all">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base italic">
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Suporte WhatsApp */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-[#F8FAFC] rounded-[40px] p-8 md:p-12 border border-blue-50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                                src="/assets/logos/whatsapp-logo.png"
                                alt="WhatsApp"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-[#000C39] mb-2">Suporte Humanizado</h3>
                            <p className="text-gray-600 font-medium">Clique e entre em contato com um especialista</p>
                        </div>
                    </div>
                    <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-5 text-lg font-black bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 uppercase tracking-widest whitespace-nowrap"
                    >
                        Chamar no WhatsApp
                    </a>
                </motion.div>

                <div className="mt-12 text-center">
                    <a href="#planos" className="text-blue-600 font-black text-lg hover:underline underline-offset-8">
                        Começar Grátis
                    </a>
                </div>
            </div>
        </section>
    );
}
