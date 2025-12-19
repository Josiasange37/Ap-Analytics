"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { Shield, Zap, Database, Cpu, Thermometer, Lock } from "lucide-react";
import { useThemeStore } from "@/lib/store";

const MODULES = [
    { id: "logic", label: "Logic Core", icon: Cpu, status: "nominal", value: 94 },
    { id: "storage", label: "Data Vault", icon: Database, status: "nominal", value: 88 },
    { id: "uplink", label: "Sat-Link", icon: Zap, status: "degraded", value: 65 },
    { id: "power", label: "Power Cell", icon: Shield, status: "nominal", value: 99 },
    { id: "cooling", label: "Thermal", icon: Thermometer, status: "nominal", value: 42 },
    { id: "security", label: "Encryption", icon: Lock, status: "nominal", value: 100 },
];

export default function SystemHealth() {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";

    return (
        <GlassCard className="h-full p-6 flex flex-col glass-panel relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: "var(--text-muted)" }}>
                    System Vitality
                </h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                    ALL SYSTEMS NOMINAL
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {MODULES.map((mod, i) => (
                    <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-4 rounded-xl border flex flex-col gap-3 transition-all duration-300 group cursor-pointer
                            ${isDark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}
                        `}
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-lg 
                                ${mod.status === "degraded"
                                    ? "bg-amber-500/10 text-amber-500"
                                    : (isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600")}
                            `}>
                                <mod.icon size={18} />
                            </div>
                            <span className="text-[10px] font-mono font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                                0x{i}F
                            </span>
                        </div>

                        <div>
                            <div className="text-xs font-bold mb-1" style={{ color: "var(--text-main)" }}>{mod.label}</div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 h-1 rounded-full bg-black/10 dark:bg-white/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${mod.value}%` }}
                                        className={`h-full ${mod.status === "degraded" ? "bg-amber-500" : "bg-indigo-500"}`}
                                    />
                                </div>
                                <span className="text-[10px] font-mono font-bold">{mod.value}%</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(#6366f1 1px, transparent 0)", backgroundSize: "20px 20px" }} />
        </GlassCard>
    );
}
