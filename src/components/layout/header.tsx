import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-44 h-11">
                        <Image
                            src="/assets/logos/logo-vsl-play-black.png"
                            alt="VSLPlay Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
                        Funcionalidades
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
                        Planos
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
                        Depoimentos
                    </Link>
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="https://app.vslplay.com/auth/" className="text-sm font-bold text-[#000C39] hover:text-blue-600 transition-colors">
                        Login
                    </Link>
                    <Button className="bg-[#9D50BB] hover:bg-[#833da1] text-white font-bold px-6 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20" size="sm" asChild>
                        <a href="#planos">
                            Começar Grátis
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
}
