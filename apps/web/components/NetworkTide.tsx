"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import GlassCard from "./GlassCard";
import { useThemeStore } from "@/lib/store";

const generateData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
        time: i,
        inbound: 40 + Math.random() * 40,
        outbound: 20 + Math.random() * 30,
    }));
};

export default function NetworkTide() {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";
    const [data, setData] = useState(generateData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newData = [...prev.slice(1)];
                const last = prev[prev.length - 1];
                newData.push({
                    time: last.time + 1,
                    inbound: Math.max(10, Math.min(100, last.inbound + (Math.random() - 0.5) * 20)),
                    outbound: Math.max(5, Math.min(80, last.outbound + (Math.random() - 0.5) * 15)),
                });
                return newData;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="h-full p-6 flex flex-col glass-panel overflow-hidden">
            <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: "var(--text-muted)" }}>
                    Traffic tide (mb/s)
                </h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                        <span className="opacity-60">INBOUND</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
                        <span className="opacity-60">OUTBOUND</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 120]} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="p-3 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl"
                                            style={{ background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
                                            <div className="text-[10px] font-bold uppercase opacity-50 mb-2">Real-time Flux</div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[10px] font-bold text-emerald-500">IN</span>
                                                    <span className="text-xs font-mono font-bold" style={{ color: "var(--text-main)" }}>{payload[0].value?.toFixed(1)}</span>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[10px] font-bold text-indigo-500">OUT</span>
                                                    <span className="text-xs font-mono font-bold" style={{ color: "var(--text-main)" }}>{payload[1].value?.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="inbound"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIn)"
                            animationDuration={1000}
                        />
                        <Area
                            type="monotone"
                            dataKey="outbound"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorOut)"
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
