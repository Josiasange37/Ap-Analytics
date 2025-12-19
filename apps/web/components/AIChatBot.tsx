"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Brain, Sparkles, Loader2 } from "lucide-react";
import GlassCard from "./GlassCard";
import { useThemeStore } from "@/lib/store";

interface Message {
    id: string;
    role: "ai" | "user";
    content: string;
    timestamp: string;
}

const INITIAL_MESSAGE: Message = {
    id: "0",
    role: "ai",
    content: "Greetings. I am your Virtual Strategist. I've analyzed your current orbital configuration. We have a 98.2% node coverage, but I'm seeing minor latency spikes in the Pacific sector. How can I assist with your deployment strategy today?",
    timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
};

export default function AIChatBot() {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: generateAIResponse(input),
                timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes("latency") || q.includes("slow")) return "Analyzing latency vectors... The spikes in the Pacific sector are correlated with high solar activity hitting Edge-Node-7. I recommend re-routing traffic through the Siberian cluster for the next 40 minutes.";
        if (q.includes("security") || q.includes("hack")) return "Security protocols are holding. However, for maximum integrity, I suggest enabling 'Quantum-RSA' rotation in the System settings. This will mask node-handshakes from passive observers.";
        if (q.includes("help") || q.includes("do")) return "I can analyze your Telemetry logs, predict node failures, and suggest optimal Sat-Link configurations. Ask me about current performance or security threats.";
        return "I've processed your query. Based on our current data flow, all systems are operating within optimal parameters. I will continue monitoring for any deviation in the diagnostic tide.";
    };

    return (
        <GlassCard className="h-full flex flex-col p-0 glass-panel overflow-hidden border-indigo-500/20 bg-indigo-500/[0.02]">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Brain size={18} />
                    </div>
                    <div>
                        <div className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--text-main)" }}>Strategist Chat</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[9px] font-bold opacity-40 uppercase tracking-tighter">AI_Online</span>
                        </div>
                    </div>
                </div>
                <Sparkles size={14} className="text-indigo-400 opacity-40" />
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                ${msg.role === 'ai' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-500/10 text-slate-400'}
                            `}>
                                {msg.role === 'ai' ? <Brain size={14} /> : <User size={14} />}
                            </div>
                            <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'items-end' : ''}`}>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed
                                    ${msg.role === 'ai'
                                        ? (isDark ? 'bg-white/5 text-indigo-100 border border-white/5' : 'bg-indigo-50 text-indigo-900 border border-indigo-100')
                                        : (isDark ? 'bg-indigo-500/20 text-white border border-indigo-500/30' : 'bg-slate-200 text-slate-900')}
                                `}>
                                    {msg.content}
                                </div>
                                <div className="text-[9px] font-bold opacity-30 mt-1 uppercase tracking-widest">{msg.timestamp}</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                            <Loader2 size={14} className="animate-spin" />
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
                            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask the Analyst about node health..."
                        className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-indigo-500/50 transition-colors placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:opacity-40"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </GlassCard>
    );
}
