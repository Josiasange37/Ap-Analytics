"use client";

import { ResponsiveContainer, AreaChart, Area } from "recharts";
import GlassCard from "./GlassCard";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    data: number[];
    chartColor?: string;
    delay?: number;
}

export default function MetricCard({
    title,
    value,
    trend,
    trendUp,
    data,
    chartColor = "#4f7cff",
    delay = 0,
}: MetricCardProps) {
    const chartData = data.map((val, i) => ({ i, val }));

    return (
        <GlassCard delay={delay} className="flex flex-col h-[160px] p-5 overflow-hidden glass-panel glass-panel-hover border-0 shadow-lg" interactive>
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{title}</h3>
                    <div className="text-[28px] font-semibold mt-0.5 tracking-tight tabular-nums" style={{ color: "var(--text-main)" }}>{value}</div>
                </div>
                <div
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${trendUp
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                >
                    {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {trend}
                </div>
            </div>

            {/* Sparkline Chart */}
            <div className="flex-1 -mx-5 -mb-5 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColor} stopOpacity={0.12} />
                                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="val"
                            stroke={chartColor}
                            strokeWidth={2}
                            fill={`url(#gradient-${title.replace(/\s/g, '')})`}
                            isAnimationActive={true}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
