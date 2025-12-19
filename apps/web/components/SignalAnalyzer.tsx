"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import GlassCard from "./GlassCard";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/store";

const generateWaveData = () => {
    return Array.from({ length: 60 }, (_, i) => ({
        time: i,
        signal: 30 + Math.random() * 40 + Math.sin(i * 0.2) * 20,
        noise: 10 + Math.random() * 15
    }));
};

export default function SignalAnalyzer() {
    const { theme } = useThemeStore();
    const [data, setData] = useState(generateWaveData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(current => {
                const nav = [...current.slice(1), {
                    time: current[current.length - 1].time + 1,
                    signal: 30 + Math.random() * 40 + Math.sin(Date.now() * 0.005) * 20,
                    noise: 10 + Math.random() * 15
                }];
                return nav;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const isDark = theme === 'dark';
    const mainColor = isDark ? '#6366f1' : '#4f7cff';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    return (
        <GlassCard className="h-full p-6 flex flex-col relative overflow-hidden glass-panel">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: 'var(--text-muted)' }}>
                        Spectrum Analyzer
                    </h3>
                    <div className="text-2xl font-bold font-mono mt-1" style={{ color: 'var(--text-main)' }}>
                        5.8<span className="text-sm opacity-50 ml-1">GHz</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="px-2 py-1 rounded border text-[10px] font-mono font-bold uppercase"
                        style={{
                            borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 124, 255, 0.3)',
                            color: mainColor,
                            background: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 124, 255, 0.1)'
                        }}>
                        Live Feed
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="signalGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={mainColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={mainColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis hide />
                        <YAxis hide domain={[0, 100]} />
                        <Area
                            type="monotone"
                            dataKey="signal"
                            stroke={mainColor}
                            strokeWidth={2}
                            fill="url(#signalGradient)"
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="noise"
                            stroke={isDark ? "#94a3b8" : "#cbd5e1"}
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            fill="none"
                            isAnimationActive={false}
                            opacity={0.5}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Grid Overlay for high-tech feel */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(0deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent)`,
                    backgroundSize: '50px 50px'
                }}
            />
        </GlassCard>
    );
}
