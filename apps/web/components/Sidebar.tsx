"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, MapPin, BarChart3, Settings, Sparkles, Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Mission Control", href: "/" },
    { icon: MapPin, label: "Sat-Link", href: "/sat-link" },
    { icon: BarChart3, label: "Telemetry", href: "/telemetry" },
    { icon: Brain, label: "AI Insight", href: "/ai-insight" },
    { icon: Settings, label: "System", href: "/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -50, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 w-[64px] flex flex-col items-center py-6 rounded-full glass-panel shadow-2xl gap-8"
        >
            {/* Minimal Logo */}
            <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-indigo-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,124,255,0.3)] ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="text-white w-5 h-5 drop-shadow-md" />
                </div>
                <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group",
                                isActive
                                    ? "text-white bg-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.2)] ring-1 ring-white/20"
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                            )}
                        >
                            <item.icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 1.5}
                                className={cn("transition-all duration-300", isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")}
                            />

                            {/* Tooltip */}
                            <div className="absolute left-full ml-5 px-3 py-1.5 bg-[#0f172a] text-xs font-semibold tracking-wide text-slate-200 rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50">
                                {item.label}
                                <div className="absolute left-0 top-1/2 -translate-x-[4px] -translate-y-1/2 border-t-[4px] border-b-[4px] border-r-[4px] border-t-transparent border-b-transparent border-r-[#0f172a]"></div>
                            </div>

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute -right-[13px] w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_#818cf8]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Avatar Placeholder */}
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 shadow-inner group cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-300 transition-colors">AD</span>
                </div>
            </div>

            <ThemeToggle />
        </motion.aside>
    );
}
