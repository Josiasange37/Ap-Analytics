"use client";

import Sidebar from "@/components/Sidebar";
import GlassCard from "@/components/GlassCard";
import SystemHealth from "@/components/SystemHealth";
import ResourceMonitor from "@/components/ResourceMonitor";
import NetworkTide from "@/components/NetworkTide";
import EventTimeline from "@/components/EventTimeline";
import { Activity, Cpu, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function TelemetryPage() {
    return (
        <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-indigo-500/30 transition-colors duration-500">
            <Sidebar />

            <main className="flex-1 ml-24 transition-all duration-300">
                <div className="max-w-[1700px] mx-auto px-8 py-8 h-screen flex flex-col">

                    {/* Header */}
                    <header className="flex justify-between items-center mb-8 shrink-0">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-main)" }}>
                                System Telemetry
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Core Engine • Optimal Performance</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col items-end">
                                <div className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Vitality Score</div>
                                <div className="text-3xl font-black font-mono tracking-tighter text-emerald-500">98.2</div>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex flex-col items-end">
                                <div className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Active Threads</div>
                                <div className="text-3xl font-black font-mono tracking-tighter" style={{ color: "var(--text-main)" }}>128</div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-12 grid-rows-6 gap-6 flex-1 min-h-0 pb-8">

                        {/* Top Summary Row */}
                        <div className="col-span-12 row-span-1 grid grid-cols-4 gap-6">
                            {[
                                { label: "Proc Load", val: "12%", icon: Cpu, trend: "-2.1%", color: "indigo" },
                                { label: "Mem Sync", val: "Synching", icon: Activity, trend: "OK", color: "emerald" },
                                { label: "Nodes", val: "1,204", icon: Globe, trend: "+12", color: "blue" },
                                { label: "Firewall", val: "Defiant", icon: Shield, trend: "Locked", color: "purple" },
                            ].map((item, i) => (
                                <GlassCard key={i} className="flex items-center gap-4 px-6 relative overflow-hidden group">
                                    <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-500 transform group-hover:scale-110 transition-transform`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase opacity-40 tracking-wider font-mono">{item.label}</div>
                                        <div className="text-lg font-bold" style={{ color: "var(--text-main)" }}>{item.val}</div>
                                    </div>
                                    <div className="ml-auto text-[10px] font-mono font-bold opacity-60">{item.trend}</div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* Main Body */}
                        <div className="col-span-4 row-span-5">
                            <SystemHealth />
                        </div>

                        <div className="col-span-5 row-span-5 flex flex-col gap-6">
                            <div className="flex-1">
                                <ResourceMonitor />
                            </div>
                            <div className="flex-1">
                                <NetworkTide />
                            </div>
                        </div>

                        <div className="col-span-3 row-span-5">
                            <EventTimeline />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
