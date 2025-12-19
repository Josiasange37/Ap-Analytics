"use client";

import Sidebar from "@/components/Sidebar";
import AITerminal from "@/components/AITerminal";
import AdviceCard from "@/components/AdviceCard";
import GlassCard from "@/components/GlassCard";
import { Brain, Sparkles, TrendingUp, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const AI_SUMMARY = `[STRATEGY_ANALYSIS_IN_PROGRESS...]
> Current Node Coverage: 98.2% (Historical Max)
> Latency Variance (Global): ±12ms
> Encryption Integrity: AES-256 Verified.

Summary: Your orbital network is performing at peak efficiency, however, I've detected a significant bandwidth bottleneck in the South Atlantic cluster between 02:00 and 04:00 UTC. CPU thermals are rising on Edge-Node-7.

Recommendation: Transition to "Quantum-RSA" for session handshakes to preemptively address the rising node density in Asian-Pacific sectors.`;

export default function AIInsightPage() {
    return (
        <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-indigo-500/30 transition-colors duration-500">
            <Sidebar />

            <main className="flex-1 ml-24 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-8 py-12 flex flex-col gap-8 h-screen overflow-hidden">

                    {/* Header */}
                    <div className="flex justify-between items-end shrink-0">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">
                                <Brain size={16} /> Virtual Strategist
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter" style={{ color: "var(--text-main)" }}>
                                Intelligent Analysis
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Engine_Processing</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 pb-8">

                        {/* Left: Terminal */}
                        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                            <AITerminal text={AI_SUMMARY} />

                            <div className="grid grid-cols-3 gap-6 shrink-0">
                                {[
                                    { label: "Predictive Health", val: "94%", icon: TrendingUp },
                                    { label: "Threat Probability", val: "0.02%", icon: ShieldAlert },
                                    { label: "Logic Efficiency", val: "99.1%", icon: Cpu },
                                ].map((stat, i) => (
                                    <GlassCard key={i} className="p-4 flex flex-col items-center justify-center text-center gap-2 glass-panel">
                                        <stat.icon size={16} className="text-indigo-400 opacity-60" />
                                        <div className="text-[9px] font-bold uppercase opacity-40 tracking-wider font-mono">{stat.label}</div>
                                        <div className="text-xl font-black font-mono tracking-tighter" style={{ color: "var(--text-main)" }}>{stat.val}</div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Right: Advice */}
                        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40" style={{ color: "var(--text-muted)" }}>
                                    Targeted Recommendations
                                </h3>
                                <p className="text-sm font-medium opacity-80">Actionable steps to enhance suite telemetry.</p>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                                <AdviceCard
                                    impact="high"
                                    category="performance"
                                    title="Optimize South Atlantic Uplink"
                                    description="Switch frequencies to the X-Band spectrum during peak UTC hours to reduce latency by approximately 14%."
                                />
                                <AdviceCard
                                    impact="med"
                                    category="security"
                                    title="Upgrade to Quantum Encryption"
                                    description="Pre-emptive security patch for Asian regional nodes. Switch security core to RSA-4096 in the global settings."
                                />
                                <AdviceCard
                                    impact="low"
                                    category="coverage"
                                    title="Rebalance Node Density"
                                    description="Distribute traffic more evenly across Pacific sectors to prevent edge-node thermal spikes."
                                />
                                <AdviceCard
                                    impact="med"
                                    category="performance"
                                    title="Purge Historical Caches"
                                    description="Clear telemetry buffers older than 14 days to improve database query speeds."
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
