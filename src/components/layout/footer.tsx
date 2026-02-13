"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#000C39] text-white py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="relative w-44 h-11 mb-6">
                            <Image
                                src="/assets/logos/logo-footer.webp"
                                alt="VSLPlay Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                            O melhor player para suas VSLs. Performance, escala e conversão sem limites. Preparado para impulsionar suas vendas.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/ovslplay" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/vslplay/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/ovslplay" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Plataforma</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                            <li><a href="#planos" className="hover:text-white transition-colors">Preços</a></li>
                            <li><a href="https://app.vslplay.com/auth/" className="hover:text-white transition-colors">Login</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Links Importantes</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="https://vslplay.com/termos-de-uso/" className="hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="https://vslplay.com/privacidade/" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                            <li><a href="https://vslplay.com/contato/" className="hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} VSLPlay. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
