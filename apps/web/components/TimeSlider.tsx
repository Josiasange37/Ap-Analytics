"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useTimeStore } from "@/lib/store";

export default function TimeSlider() {
    const { isPlaying, currentTime, startTime, endTime, togglePlay, setTime, initialize, initialized } = useTimeStore();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!initialized) initialize();
    }, [initialize, initialized]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && initialized) {
            interval = setInterval(() => {
                useTimeStore.setState((state) => {
                    const next = state.currentTime + (60000 * 5); // 5 mins per tick
                    return { currentTime: next > state.endTime ? state.startTime : next };
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, initialized]);

    if (!mounted) return null;

    const progress = ((currentTime - startTime) / (endTime - startTime));
    const isEnded = currentTime >= endTime && !isPlaying;

    // Circular Progress Props - Smaller size
    const radius = 22; // Reduced from 26
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="fixed bottom-8 right-6 z-[9999]"> {/* Suggesting bottom-8 right-6 for "out of view" feel */}
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative flex items-center"
            >
                {/* Time Label (Floating Left) */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: -16, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            className="backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/10 text-right mr-2 absolute right-full whitespace-nowrap z-50 pointer-events-none"
                            style={{ background: "var(--bg-float)", color: "var(--text-main)" }}
                        >
                            <div className="text-[9px] uppercase tracking-[0.15em] font-bold" style={{ color: "var(--text-muted)" }}>
                                {isEnded ? "Replay Simulation" : isPlaying ? "Live Stream" : "Paused"}
                            </div>
                            <div className="text-sm font-bold font-mono tabular-nums leading-none mt-1">
                                {new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main FAB - Jewel Encrusted */}
                <motion.button
                    onClick={() => isEnded ? (setTime(startTime), togglePlay()) : togglePlay()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 rounded-full flex items-center justify-center group"
                >
                    {/* Glow moving behind */}
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/40 transition-colors duration-500"></div>

                    {/* Outer Glass Ring */}
                    <div className="absolute inset-0 rounded-full bg-slate-900/40 backdrop-blur-sm border border-white/5 shadow-2xl"></div>

                    {/* Progress Ring (Neon) */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none rounded-full overflow-visible">
                        {/* Track */}
                        <circle
                            cx="32" cy="32" r={radius}
                            stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none"
                        />
                        {/* Indicator */}
                        <circle
                            cx="32" cy="32" r={radius}
                            stroke="#6366f1" strokeWidth="3" fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-300 ease-linear shadow-[0_0_10px_#6366f1] drop-shadow-[0_0_4px_rgba(99,102,241,0.8)]"
                            style={{ filter: "drop-shadow(0 0 2px #818cf8)" }}
                        />
                    </svg>

                    {/* Inner Jewel Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            layout
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner transition-all duration-500
                                ${isPlaying
                                    ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-[0_0_15px_rgba(79,124,255,0.4)]"
                                    : "bg-slate-800 border border-white/10"
                                }
                            `}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isEnded ? "replay" : isPlaying ? "pause" : "play"}
                                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isEnded ? <RotateCcw size={18} /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.button>
            </motion.div>
        </div>
    );
}
