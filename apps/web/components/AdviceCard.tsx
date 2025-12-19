"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { useThemeStore } from "@/lib/store";

interface AdviceProps {
    title: string;
    description: string;
    impact: "high" | "med" | "low";
    category: "performance" | "security" | "coverage";
}

export default function AdviceCard({ title, description, impact, category }: AdviceProps) {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";

    const colors = {
        high: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        med: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        low: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group
                ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-indigo-500/30' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}
            `}
        >
            <div className="flex justify-between items-start">
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter ${colors[impact]}`}>
                    {impact} Impact
                </div>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Zap size={16} />
                </div>
            </div>

            <div>
                <h4 className="font-bold text-sm mb-1" style={{ color: "var(--text-main)" }}>{title}</h4>
                <p className="text-xs opacity-60 leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{category}</span>
                <button className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                    EXECUTE <ArrowUpRight size={12} />
                </button>
            </div>
        </motion.div>
    );
}
