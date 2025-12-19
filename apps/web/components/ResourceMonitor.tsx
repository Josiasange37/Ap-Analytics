"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { useThemeStore } from "@/lib/store";

interface GaugeProps {
    value: number;
    label: string;
    color: string;
    icon?: string;
}

function Gauge({ value, label, color }: GaugeProps) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="opacity-10 dark:opacity-5 text-slate-500"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center group">
                    <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: "var(--text-main)" }}>
                        {Math.round(value)}
                    </span>
                    <span className="text-[9px] font-bold uppercase opacity-40 tracking-widest">{label}</span>
                </div>
            </div>
        </div>
    );
}

export default function ResourceMonitor() {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";
    const [metrics, setMetrics] = useState({ cpu: 45, ram: 62, io: 28 });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
                ram: Math.max(10, Math.min(95, prev.ram + (Math.random() - 0.5) * 5)),
                io: Math.max(5, Math.min(95, prev.io + (Math.random() - 0.5) * 15)),
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="h-full p-8 flex flex-col justify-between glass-panel">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-8" style={{ color: "var(--text-muted)" }}>
                Hardware Load
            </h3>

            <div className="flex justify-around items-center flex-1">
                <Gauge value={metrics.cpu} label="CPU" color={isDark ? "#6366f1" : "#4f7cff"} />
                <Gauge value={metrics.ram} label="RAM" color={isDark ? "#818cf8" : "#2563eb"} />
                <Gauge value={metrics.io} label="Disk IO" color={isDark ? "#c7d2fe" : "#60a5fa"} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                <div>
                    <div className="text-[10px] font-bold opacity-40 uppercase mb-1">Temp</div>
                    <div className="text-sm font-mono font-bold" style={{ color: "var(--text-main)" }}>42°C</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold opacity-40 uppercase mb-1">Fan</div>
                    <div className="text-sm font-mono font-bold" style={{ color: "var(--text-main)" }}>3200 RPM</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold opacity-40 uppercase mb-1">Uptime</div>
                    <div className="text-sm font-mono font-bold" style={{ color: "var(--text-main)" }}>14d 2h</div>
                </div>
            </div>
        </GlassCard>
    );
}
