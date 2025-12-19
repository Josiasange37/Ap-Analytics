"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { useThemeStore } from "@/lib/store";

/**
 * SettingsSection wrapper
 */
export function SettingsSection({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-main)" }}>{title}</h2>
                <p className="text-sm opacity-60" style={{ color: "var(--text-muted)" }}>{description}</p>
            </div>
            <GlassCard className="p-6 glass-panel space-y-6">
                {children}
            </GlassCard>
        </section>
    );
}

/**
 * FuturisticToggle component
 */
export function FuturisticToggle({ enabled, onChange, label }: { enabled: boolean, onChange: (val: boolean) => void, label: string }) {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-between group cursor-pointer" onClick={() => onChange(!enabled)}>
            <span className="text-sm font-medium transition-colors group-hover:text-indigo-400" style={{ color: "var(--text-main)" }}>{label}</span>
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-indigo-500/20' : 'bg-slate-500/10'}`}>
                <motion.div
                    animate={{ x: enabled ? 26 : 2 }}
                    className={`absolute top-1 w-4 h-4 rounded-full shadow-lg ${enabled ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-slate-400'}`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );
}

/**
 * SettingsSlider component
 */
export function SettingsSlider({ value, onChange, label, min = 0, max = 100, unit = "%" }: { value: number, onChange: (val: number) => void, label: string, min?: number, max?: number, unit?: string }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-60">
                <span>{label}</span>
                <span className="font-mono text-indigo-400">{value}{unit}</span>
            </div>
            <div className="relative h-1.5 w-full bg-slate-500/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((value - min) / (max - min)) * 100}%` }}
                    className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}
