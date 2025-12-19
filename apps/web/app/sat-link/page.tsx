"use client";

import Sidebar from "@/components/Sidebar";
import GlobalNetwork from "@/components/GlobalNetwork";
import SignalAnalyzer from "@/components/SignalAnalyzer";
import SatelliteList from "@/components/SatelliteList";
import GlassCard from "@/components/GlassCard";
import { Activity, Radio, Lock, Globe, Zap } from "lucide-react";

export default function SatLinkPage() {
    return (
        <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-indigo-500/30 transition-colors duration-500">
            <Sidebar />

            <main className="flex-1 ml-24 transition-all duration-300">
                <div className="max-w-[1600px] mx-auto px-8 py-8 h-screen flex flex-col">

                    {/* Header */}
                    <header className="flex justify-between items-center mb-8 shrink-0">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-main)" }}>
                                Sat-Link Command
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Orbital Array • Online</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <GlassCard className="px-4 py-2 flex items-center gap-3 !rounded-full">
                                <Activity size={18} className="text-emerald-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold opacity-50">Uplink</span>
                                    <span className="text-xs font-bold font-mono">245 MB/s</span>
                                </div>
                            </GlassCard>
                            <GlassCard className="px-4 py-2 flex items-center gap-3 !rounded-full">
                                <Radio size={18} className="text-indigo-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold opacity-50">Frequency</span>
                                    <span className="text-xs font-bold font-mono">5.8 GHz</span>
                                </div>
                            </GlassCard>
                        </div>
                    </header>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 pb-8">

                        {/* Left Col: Gauges */}
                        <div className="col-span-3 flex flex-col gap-6">
                            <GlassCard className="flex-1 p-6 relative overflow-hidden glass-panel group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Globe size={120} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-70">Global Coverage</h3>
                                <div className="flex items-end gap-2 mt-auto">
                                    <span className="text-6xl font-black tracking-tighter" style={{ color: 'var(--text-main)' }}>98</span>
                                    <span className="text-xl font-bold mb-2 opacity-60">%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[98%] shadow-[0_0_10px_#6366f1]"></div>
                                </div>
                            </GlassCard>

                            <GlassCard className="h-[200px] p-6 glass-panel flex flex-col justify-center items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                    <Lock size={32} />
                                </div>
                                <h3 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>Connection Secure</h3>
                                <p className="text-xs opacity-60 mt-1">AES-256 Encryption Active</p>
                            </GlassCard>
                        </div>

                        {/* Middle Col: Globe & Stats */}
                        <div className="col-span-6 flex flex-col gap-6">
                            <div className="flex-1 min-h-0">
                                <GlobalNetwork />
                            </div>

                            {/* Spectrum Analyzer (Compact) */}
                            <div className="h-[200px]">
                                <SignalAnalyzer />
                            </div>
                        </div>

                        {/* Right Col: List */}
                        <div className="col-span-3">
                            <SatelliteList />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
