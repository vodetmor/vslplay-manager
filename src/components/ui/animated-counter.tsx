"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, animate } from "framer-motion";

export function AnimatedCounter({ value, duration = 0.5 }: { value: number; duration?: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        // Check if it's a whole number or has decimals
        if (value % 1 === 0) {
            return Math.round(latest).toString(); // Convert to string for textContent
        }
        return latest.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    useEffect(() => {
        const animation = animate(count, value, { duration: duration, ease: "easeOut" });
        return animation.stop;
    }, [value, count, duration]);

    const outputRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            if (outputRef.current) {
                outputRef.current.textContent = latest;
            }
        });
        return unsubscribe;
    }, [rounded]);

    return <span ref={outputRef} />;
}
