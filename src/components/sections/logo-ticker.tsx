"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
    "hotmart.webp",
    "astron-members.webp",
    "builderal.webp",
    "edduz.webp",
    "wordpress.webp",
    "elementor.webp",
    "great-pages.webp",
    "webflow.webp",
    "wix.webp",
    "leadlovers.webp",
    "memberkit.webp",
    "ticto.webp",
    "cademi.webp",
    "typebot.webp",
];

export function LogoTicker() {
    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                    Integração nativa com as maiores plataformas
                </p>
            </div>

            <div className="flex overflow-hidden relative mask-linear-fade">
                <motion.div
                    className="flex gap-12 w-max items-center"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                        <div key={index} className="relative h-8 w-32 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <Image
                                src={`/assets/integrations/${logo}`}
                                alt={logo.replace(".webp", "")}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
            .mask-linear-fade {
                 mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
          `}</style>
        </section>
    );
}
