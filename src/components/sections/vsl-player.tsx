"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface VSLPlayerProps {
    videoId?: string;
    autoPlay?: boolean;
}

export function VSLPlayer({ videoId = "10144c8c-f331-4731-bbee-3dc307b200fd" }: VSLPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Limpa o container antes de injetar
            containerRef.current.innerHTML = "";

            // Injeta o player com suporte dual (id e vid) conforme documentação e snippet oficial
            const playerHTML = `<vslplay-player id="${videoId}" vid="${videoId}" style="width: 100%; height: 100%;"></vslplay-player>`;
            containerRef.current.innerHTML = playerHTML;

            // Injeta o script manualmente para garantir execução após o elemento estar no DOM
            const script = document.createElement("script");
            script.src = "https://cdn.vslplay.com/player.js";
            script.defer = true;
            containerRef.current.appendChild(script);
        }
    }, [videoId]);

    return (
        <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}
