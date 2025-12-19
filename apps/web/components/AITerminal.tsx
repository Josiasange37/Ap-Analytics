"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { Sparkles, Terminal } from "lucide-react";

export default function AITerminal({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setIsComplete(true);
            }
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <GlassCard className="h-full flex flex-col glass-panel overflow-hidden border-indigo-500/20 bg-indigo-500/[0.02]">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Strategic_Analysis_Terminal</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-hide">
                <div className="text-indigo-400/80 mb-4 whitespace-pre-wrap">
                    {displayedText}
                    {!isComplete && (
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-indigo-400 ml-1 translate-y-0.5"
                        />
                    )}
                </div>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-6"
                    >
                        <Sparkles size={14} />
                        ANALYSIS COMPLETE. ACTIONABLE INSIGHTS GENERATED.
                    </motion.div>
                )}
            </div>
        </GlassCard>
    );
}
