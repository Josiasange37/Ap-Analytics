"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    interactive?: boolean;
}

export default function GlassCard({ children, className, delay = 0, interactive = false }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay, ease: "easeOut" }}
            className={cn(
                "bg-white rounded-2xl border border-[#e8ecf0]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.04)]",
                interactive && "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
