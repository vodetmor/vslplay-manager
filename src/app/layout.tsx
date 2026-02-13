import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "VSLPlay - Player de Vídeo para Alta Conversão",
  description: "Aumente suas vendas com o player de vídeo mais rápido e eficiente do mercado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
