"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GlassCard from "./GlassCard";
import { useTimeStore, useThemeStore } from '@/lib/store';
import { generateMockHistory, GeoPoint } from '@/lib/mock_data';
import { MapPin } from "lucide-react";

// Dynamic imports for Leaflet components
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const CircleMarker = dynamic(
    () => import("react-leaflet").then((mod) => mod.CircleMarker),
    { ssr: false }
);
const Tooltip = dynamic(
    () => import("react-leaflet").then((mod) => mod.Tooltip),
    { ssr: false }
);

export default function GeoWidget() {
    const [mounted, setMounted] = useState(false);
    const [allPoints, setAllPoints] = useState<GeoPoint[]>([]);

    const currentTheme = useThemeStore((state) => state.theme);
    const currentTime = useTimeStore((state) => state.currentTime);
    const initialized = useTimeStore((state) => state.initialized);

    useEffect(() => {
        setMounted(true);
        setAllPoints(generateMockHistory());

        // Load Leaflet CSS
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }
    }, []);

    // Update Styles when theme changes
    useEffect(() => {
        const styleId = 'map-theme-styles';
        let style = document.getElementById(styleId) as HTMLStyleElement;

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        const isDark = currentTheme === 'dark';

        // Dynamic CSS based on theme
        style.innerHTML = `
            .leaflet-pane .leaflet-marker-pane { transition: opacity 0.4s ease; }

            /* MARKER STYLING */
            .leaflet-marker-icon.data-jewel {
                background: ${isDark
                ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(79, 124, 255, 0.6))'
                : 'radial-gradient(circle at 30% 30%, #4f7cff, #2563eb)'}; 
                border-radius: 50%;
                box-shadow: ${isDark
                ? '0 0 10px rgba(79, 124, 255, 0.4), inset 0 0 10px rgba(79, 124, 255, 0.8)'
                : '0 2px 6px rgba(37,99,235,0.4), inset 0 2px 4px rgba(255,255,255,0.3)'};
                transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
                opacity: 0.9;
                border: ${isDark ? 'none' : '2px solid white'};
            }

            /* HOVER EFFECT */
            .leaflet-marker-pane:hover .data-jewel {
                opacity: 0.3;
                transform: scale(0.8);
                filter: grayscale(0.6) blur(1px);
            }
            .leaflet-marker-pane .data-jewel:hover {
                opacity: 1 !important;
                transform: scale(1.5) !important;
                filter: none !important;
                background: ${isDark
                ? 'radial-gradient(circle at 30% 30%, #ffffff, #6366f1)'
                : 'radial-gradient(circle at 30% 30%, #ffffff, #4f7cff)'};
                z-index: 9999 !important;
                border-color: white;
            }

            /* TOOLTIP */
            .custom-map-tooltip {
                background: ${isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.95)'} !important;
                backdrop-filter: blur(16px);
                border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
                border-radius: 12px;
                box-shadow: 0 10px 40px -10px rgba(0,0,0,0.2);
                padding: 8px 12px;
                color: ${isDark ? 'white' : '#1e293b'};
                font-family: var(--font-display);
            }
            .custom-map-tooltip:before {
                border-top-color: ${isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.95)'} !important;
            }
            .leaflet-tooltip-left:before, .leaflet-tooltip-right:before, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before {
                display: none !important;
            }
        `;

    }, [currentTheme]);

    const visiblePoints = initialized ? allPoints.filter(p =>
        p.timestamp <= currentTime && p.timestamp > (currentTime - 2 * 60 * 60 * 1000)
    ) : allPoints.slice(0, 50);

    if (!mounted) {
        return (
            <GlassCard className="h-full flex items-center justify-center bg-transparent border-0">
                <span className="text-slate-500 font-mono text-xs tracking-widest uppercase">Initializing Sat-Link...</span>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="h-full p-0 relative overflow-hidden border-0 bg-transparent shadow-none">
            {/* Header Overlay */}
            <div className="absolute top-5 left-5 z-[500] flex flex-col gap-2 pointer-events-none">
                <div className={`flex items-center gap-3 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl transition-colors duration-500
                    ${currentTheme === 'dark'
                        ? 'bg-[#020617]/80 border border-white/5'
                        : 'bg-white/80 border border-slate-200/50'
                    }`}
                >
                    {/* Status Dot */}
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 leading-none mb-0.5" style={{ color: 'var(--text-muted)' }}>
                            Realtime
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold tabular-nums tracking-tight" style={{ color: 'var(--text-main)' }}>
                                {visiblePoints.length}
                            </span>
                            <span className="text-[9px] font-medium opacity-60" style={{ color: 'var(--text-muted)' }}>
                                signals
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={`h-6 w-px mx-1 ${currentTheme === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`}></div>

                    {/* Velocity */}
                    <div className="flex flex-col items-end min-w-[50px]">
                        <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-0.5">
                            <MapPin size={8} strokeWidth={3} /> +12
                        </span>
                        <span className="text-[9px] font-medium opacity-60" style={{ color: 'var(--text-muted)' }}>
                            / min
                        </span>
                    </div>
                </div>
            </div>

            <MapContainer
                key={`map-${currentTheme}`} // Force Remount on Theme Change to swap tiles cleanly
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={8}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                worldCopyJump={false}
                style={{ height: "100%", width: "100%", background: "transparent" }}
                zoomControl={false}
                attributionControl={false}
                className={currentTheme === 'dark' ? "brightness-90 contrast-110 saturate-150" : ""}
            >
                <TileLayer
                    url={currentTheme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    }
                    noWrap={true}
                />

                {visiblePoints.map((p, i) => (
                    <CircleMarker
                        key={i}
                        center={[p.lat, p.lng]}
                        radius={5}
                        pathOptions={{ className: "data-jewel", stroke: false }}
                    >
                        <Tooltip
                            direction="top"
                            offset={[0, -10]}
                            opacity={1}
                            className="custom-map-tooltip"
                        >
                            <div className="text-xs font-medium px-1 min-w-[120px]">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <span className="font-bold tracking-wide" style={{ color: 'var(--text-main)' }}>SIGNAL #{i + 1}</span>
                                    <span className="bg-indigo-500/10 text-indigo-500 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Log</span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                    <span>Time</span>
                                    <span className="text-right font-mono opacity-80">
                                        {new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span>Lat</span>
                                    <span className="text-right font-mono opacity-80">{p.lat.toFixed(2)}</span>
                                </div>
                            </div>
                        </Tooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </GlassCard>
    );
}
