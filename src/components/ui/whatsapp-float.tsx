"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function WhatsAppFloat() {
    return (
        <motion.a
            href="https://wa.me/5527992847416?text=Gostaria+de+um+atendimento.+Vim+do+site+VSLPLAY."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0]
            }}
            transition={{
                y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
            }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "fixed z-[9999] flex items-center justify-center transition-all duration-300",
                "bottom-6 right-6 md:bottom-10 md:right-10",
                "w-12 h-12 md:w-16 md:h-16",
                "bg-[#25d366] rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)]"
            )}
            id="whatsapp-float"
            title="Fale conosco no WhatsApp"
        >
            <img
                src="https://i.imgur.com/YxNIgA5.png"
                alt="WhatsApp"
                style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "contain",
                    margin: 0,
                    display: "block",
                    borderRadius: 0
                }}
            />
        </motion.a>
    );
}
