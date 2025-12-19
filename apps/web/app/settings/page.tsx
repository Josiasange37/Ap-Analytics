"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlassCard from "@/components/GlassCard";
import { SettingsSection, FuturisticToggle, SettingsSlider } from "@/components/SettingsUI";
import { Monitor, Globe, Shield, Zap, RefreshCcw } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export default function SettingsPage() {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === "dark";

    // Mock states for settings
    const [hologramOpacity, setHologramOpacity] = useState(85);
    const [animationSpeed, setAnimationSpeed] = useState(1.2);
    const [satSensitivity, setSatSensitivity] = useState(92);
    const [encryptionLevel, setEncryptionLevel] = useState(256);
    const [autoRotate, setAutoRotate] = useState(true);
    const [highPrecision, setHighPrecision] = useState(true);

    return (
        <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-indigo-500/30 transition-colors duration-500">
            <Sidebar />

            <main className="flex-1 ml-24 transition-all duration-300">
                <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col gap-10">

                    {/* Header */}
                    <header className="shrink-0">
                        <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: "var(--text-main)" }}>
                            System Configuration
                        </h1>
                        <p className="text-sm opacity-60 max-w-xl" style={{ color: "var(--text-muted)" }}>
                            Adjust core engine parameters, interface aesthetics, and orbital link protocols.
                            Terminal version 0.1.0-alpha.
                        </p>
                    </header>

                    {/* Settings Sections */}
                    <div className="grid gap-8">

                        <SettingsSection
                            title="Interface Terminal"
                            description="Customize the visual experience and rendering quality of the dashboard."
                        >
                            <div className="space-y-8">
                                <div className="flex items-center justify-between group cursor-pointer" onClick={toggleTheme}>
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Visual Mode</div>
                                        <div className="text-[10px] opacity-40 uppercase tracking-tighter uppercase font-bold">Switch between Luminous Dark and Comfort Light</div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-lg border font-bold text-xs transition-all duration-300
                                        ${isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-slate-100 border-slate-300 text-slate-600'}
                                    `}>
                                        {isDark ? 'LUMINOUS DARK' : 'COMFORT LIGHT'}
                                    </div>
                                </div>

                                <SettingsSlider
                                    label="Hologram Opacity"
                                    value={hologramOpacity}
                                    onChange={setHologramOpacity}
                                />

                                <FuturisticToggle
                                    label="Dynamic Background Gradients"
                                    enabled={true}
                                    onChange={() => { }}
                                />
                            </div>
                        </SettingsSection>

                        <SettingsSection
                            title="Orbital Protocols"
                            description="Fine-tune how the engine interacts with satellite clusters."
                        >
                            <div className="space-y-8">
                                <SettingsSlider
                                    label="Sat-Link Sensitivity"
                                    value={satSensitivity}
                                    onChange={setSatSensitivity}
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <FuturisticToggle
                                        label="Auto-rotate Globe"
                                        enabled={autoRotate}
                                        onChange={setAutoRotate}
                                    />
                                    <FuturisticToggle
                                        label="High Precision Tracking"
                                        enabled={highPrecision}
                                        onChange={setHighPrecision}
                                    />
                                </div>
                            </div>
                        </SettingsSection>

                        <SettingsSection
                            title="Security Core"
                            description="Configure system-wide encryption levels and data vault security."
                        >
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Encryption Standard</div>
                                        <div className="text-[10px] opacity-40 uppercase tracking-tighter font-bold">Current protocol strength</div>
                                    </div>
                                    <select
                                        value={encryptionLevel}
                                        onChange={(e) => setEncryptionLevel(parseInt(e.target.value))}
                                        className="bg-transparent border border-white/10 rounded-lg px-3 py-1 text-xs font-mono font-bold outline-none cursor-pointer hover:border-indigo-500/50 transition-colors"
                                    >
                                        <option value={128}>AES-128</option>
                                        <option value={256}>AES-256 (ULTRA)</option>
                                        <option value={512}>RSA-4096 (QUANTUM)</option>
                                    </select>
                                </div>

                                <FuturisticToggle
                                    label="Identity Rotation (24h)"
                                    enabled={false}
                                    onChange={() => { }}
                                />
                            </div>
                        </SettingsSection>

                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-4 mt-4 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <button className="px-6 py-2.5 rounded-xl border border-white/5 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity">
                            RESET DEFAULTS
                        </button>
                        <button className="px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                            APPLY CHANGES
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
