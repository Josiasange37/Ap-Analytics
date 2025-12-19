"use client";

import GlassCard from "./GlassCard";
import { Satellite, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useThemeStore } from "@/lib/store";

const SATELLITES = [
    { id: "SAT-42A", type: "Low Orbit", status: "locked", signal: 98, latency: 24 },
    { id: "ORB-9", type: "Geo-Stat", status: "locked", signal: 85, latency: 120 },
    { id: "LINK-X", type: "Low Orbit", status: "searching", signal: 12, latency: 0 },
    { id: "SAT-11B", type: "Polar", status: "idle", signal: 0, latency: 0 },
    { id: "V-SAT-7", type: "Geo-Stat", status: "locked", signal: 92, latency: 115 },
];

export default function SatelliteList() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <GlassCard className="h-full p-0 flex flex-col glass-panel overflow-hidden">
            <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: 'var(--text-muted)' }}>
                        Target List
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>
                        <RefreshCw size={10} className="animate-spin duration-[3000ms]" />
                        Scanning
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {SATELLITES.map((sat) => (
                        <div
                            key={sat.id}
                            className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-opacity-30 cursor-pointer
                                ${isDark ? 'hover:bg-white/5 hover:border-white' : 'hover:bg-slate-100 hover:border-slate-300'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${sat.status === 'locked'
                                        ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')
                                        : sat.status === 'searching'
                                            ? (isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600')
                                            : (isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-400')
                                    }
                                `}>
                                    <Satellite size={16} />
                                </div>
                                <div>
                                    <div className="font-bold font-mono text-sm leading-none mb-1" style={{ color: 'var(--text-main)' }}>
                                        {sat.id}
                                    </div>
                                    <div className="text-[10px] font-medium opacity-60 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                        {sat.type}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1.5 mb-1">
                                    <span className={`text-xs font-bold tabular-nums 
                                        ${sat.status === 'locked' ? (isDark ? 'text-white' : 'text-slate-900') : 'opacity-40'}
                                    `}>
                                        {sat.signal}%
                                    </span>
                                    {sat.status === 'locked' ? <Wifi size={12} className="text-emerald-500" /> : <WifiOff size={12} className="opacity-30" />}
                                </div>
                                <div className="text-[10px] font-mono opacity-50" style={{ color: 'var(--text-muted)' }}>
                                    {sat.status === 'locked' ? `${sat.latency}ms` : '---'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
