"use client";

// Polyfill for GPUShaderStage to avoid "GPUShaderStage is undefined" error in some environments/versions of Three.js
if (typeof window !== 'undefined' && !window.GPUShaderStage) {
    (window as any).GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
}

import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useMemo } from "react";
import { useThemeStore } from "@/lib/store";
import GlassCard from "./GlassCard";
import { Maximize2, RotateCcw } from "lucide-react";

// Dynamic import for Globe (No SSR)
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false }) as any;

// Mock Data Generator for Hex Bins
const generateHexData = (count: number) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            lat: (Math.random() - 0.5) * 160,
            lng: (Math.random() - 0.5) * 360,
            weight: Math.random() * 0.8 + 0.2, // 0.2 to 1.0 (Height/Intensity)
        });
    }
    return data;
};

export default function GlobalNetwork() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hexData, setHexData] = useState<any[]>([]);

    // Initial Data Generation
    useEffect(() => {
        setHexData(generateHexData(1500));
    }, []);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Polling for container size changes (Sidebar animation safeguard)
        const interval = setInterval(handleResize, 500);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, []);

    // Auto-Rotate
    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
        }
    }, [dimensions]); // Retrigger when dimensions change (remount)


    // Theme Configuration
    const globeConfig = useMemo(() => ({
        globeImageUrl: isDark
            ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
            : "//unpkg.com/three-globe/example/img/earth-day.jpg",
        bumpImageUrl: "//unpkg.com/three-globe/example/img/earth-topology.png",
        backgroundColor: "rgba(0,0,0,0)",
        atmosphereColor: isDark ? "#6366f1" : "#4f7cff",
        hexColor: (d: any) => {
            // Color scale based on weight
            if (d.weight > 0.8) return isDark ? "#6366f1" : "#2563eb"; // High (Purple/Blue)
            if (d.weight > 0.5) return isDark ? "#818cf8" : "#60a5fa"; // Med
            if (d.weight > 0.3) return isDark ? "#c7d2fe" : "#93c5fd"; // Low
            return isDark ? "#1e1b4b" : "#dbeafe";
        }
    }), [isDark]);

    return (
        <GlassCard className="h-full p-0 flex flex-col relative overflow-hidden glass-panel group">
            {/* Overlay Header */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: 'var(--text-muted)' }}>
                    Usage Topology
                </h3>
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                    onClick={() => {
                        globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
                    }}
                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Globe Container */}
            <div ref={containerRef} className="flex-1 w-full h-full cursor-move">
                {dimensions.width > 0 && (
                    <Globe
                        ref={globeEl}
                        width={dimensions.width}
                        height={dimensions.height}
                        globeImageUrl={globeConfig.globeImageUrl}
                        bumpImageUrl={globeConfig.bumpImageUrl}
                        backgroundColor={globeConfig.backgroundColor}

                        // Hex Bin Configuration
                        hexBinPointsData={hexData}
                        hexBinPointWeight="weight"
                        hexBinResolution={4} // Decrease number -> Bigger Hexagons
                        hexMargin={0.2}
                        hexTopColor={globeConfig.hexColor}
                        hexSideColor={() => isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(37, 99, 235, 0.1)"}
                        hexBinMerge={true}
                        hexAltitude={(d: any) => d.sumWeight * 0.1} // Scale height by accumulated weight

                        // Atmosphere
                        atmosphereColor={globeConfig.atmosphereColor}
                        atmosphereAltitude={0.15}
                    />
                )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 z-10 p-3 rounded-lg backdrop-blur-md border border-white/10 shadow-xl"
                style={{ background: isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(255, 255, 255, 0.6)' }}
            >
                <div className="text-[9px] font-bold uppercase tracking-wider mb-2 opacity-70">
                    Usage Intensity
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-sm ${isDark ? 'bg-[#6366f1]' : 'bg-[#2563eb]'}`}></div>
                        <span className="text-[10px] font-medium opacity-80">High Traffic</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-sm ${isDark ? 'bg-[#818cf8]' : 'bg-[#60a5fa]'}`}></div>
                        <span className="text-[10px] font-medium opacity-80">Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-sm ${isDark ? 'bg-[#c7d2fe]' : 'bg-[#93c5fd]'}`}></div>
                        <span className="text-[10px] font-medium opacity-80">Low Signal</span>
                    </div>
                </div>
            </div>

        </GlassCard>
    );
}
