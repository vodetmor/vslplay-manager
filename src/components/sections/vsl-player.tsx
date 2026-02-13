"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface VSLPlayerProps {
    videoId?: string;
    autoPlay?: boolean;
}

export function VSLPlayer({ videoId = "10144c8c-f331-4731-bbee-3dc307b200fd" }: VSLPlayerProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="relative w-full aspect-video bg-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-pulse flex items-center justify-center">
                <p className="text-gray-600 text-sm font-medium">Carregando player...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Script
                src="https://cdn.vslplay.com/player.js"
                strategy="afterInteractive"
            />
            <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                    __html: `<vslplay-player id="${videoId}" vid="${videoId}" style="width: 100%; height: 100%;"></vslplay-player>`
                }}
            />
        </div>
    );
}
