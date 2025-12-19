"use client";

import { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import { ScrollText, ShieldCheck, AlertTriangle, Cpu } from "lucide-react";

const INITIAL_EVENTS = [
    { id: 1, type: "system", message: "Kernel initialization sequence complete", time: "05:12:04", level: "info" },
    { id: 2, type: "security", message: "Firewall rule-set 4 updated", time: "05:14:22", level: "info" },
    { id: 3, type: "hardware", message: "Core 4 temperature spike (48°C)", time: "05:18:10", level: "warning" },
    { id: 4, type: "system", message: "New DHCP lease assigned: 192.168.1.104", time: "05:20:45", level: "info" },
    { id: 5, type: "security", message: "Encrypted tunnel established: Tokyo-Node-4", time: "05:22:12", level: "success" },
];

export default function EventTimeline() {
    const [events, setEvents] = useState(INITIAL_EVENTS);

    useEffect(() => {
        const messages = [
            { type: "system", message: "Cache flush performed", level: "info" },
            { type: "hardware", message: "Fan speed adjusted (3400 RPM)", level: "info" },
            { type: "security", message: "Port scan detected and blocked", level: "warning" },
            { type: "system", message: "Log rotation completed", level: "info" },
        ];

        const interval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const newEvent = {
                id: Date.now(),
                ...randomMsg,
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            };
            setEvents(prev => [newEvent, ...prev].slice(0, 15));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="h-full flex flex-col glass-panel overflow-hidden p-0">
            <div className="p-5 border-b sticky top-0 bg-inherit z-10" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: 'var(--text-muted)' }}>
                        Live Interrupts
                    </h3>
                    <ScrollText size={14} className="opacity-40" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[10px] p-4 space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="flex gap-4 group">
                        <div className="flex flex-col items-center gap-1.5 shrink-0">
                            <div className={`p-1 rounded-sm
                                ${event.level === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                                    event.level === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                                        'bg-indigo-500/20 text-indigo-400'}
                            `}>
                                {event.type === 'security' ? <ShieldCheck size={10} /> :
                                    event.type === 'hardware' ? <Cpu size={10} /> :
                                        <ScrollText size={10} />}
                            </div>
                            <div className="w-px flex-1 bg-white/5 group-last:bg-transparent"></div>
                        </div>
                        <div className="pb-4 border-b border-white/5 group-last:border-0 flex-1">
                            <div className="flex justify-between mb-1">
                                <span className={`uppercase font-bold tracking-widest
                                    ${event.level === 'warning' ? 'text-amber-500' : 'text-indigo-400'}
                                `}>
                                    {event.type}
                                </span>
                                <span className="opacity-30">{event.time}</span>
                            </div>
                            <p className="opacity-70 leading-relaxed font-medium" style={{ color: "var(--text-main)" }}>
                                {event.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
