"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import LivePulse from "@/components/LivePulse";
import MetricCard from "@/components/MetricCard";
import GeoWidget from "@/components/GeoWidget";
import TimeSlider from "@/components/TimeSlider";

interface Stats {
  active_users: number;
  total_sessions: number;
  bounce_rate: number;
  duration: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error("Failed to fetch stats", e);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-indigo-500/30 transition-colors duration-500">
      <Sidebar />

      <main className="flex-1 ml-24 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-8 py-8">

          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-main)" }}>
                Mission Control
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>System Nominal • Network Active</p>
              </div>
            </div>
            <LivePulse />
          </header>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <MetricCard
              title="Active Users"
              value={stats ? stats.active_users.toLocaleString() : "..."}
              trend="+12%"
              trendUp={true}
              data={[10, 25, 15, 30, 45, 35, 60]}
              delay={0.05}
            />
            <MetricCard
              title="Total Sessions"
              value={stats ? (stats.total_sessions / 1000).toFixed(1) + "k" : "..."}
              trend="+8%"
              trendUp={true}
              data={[20, 22, 25, 24, 30, 35, 40]}
              chartColor="#34c38f"
              delay={0.1}
            />
            <MetricCard
              title="Bounce Rate"
              value={stats ? stats.bounce_rate + "%" : "..."}
              trend="-2%"
              trendUp={true}
              data={[50, 48, 45, 46, 42, 43, 41]}
              chartColor="#f7b84b"
              delay={0.15}
            />
            <MetricCard
              title="Avg. Duration"
              value={stats ? stats.duration : "..."}
              trend="-5%"
              trendUp={false}
              data={[5, 5, 4, 4, 3, 4, 4]}
              chartColor="#a78bfa"
              delay={0.2}
            />
          </div>

          {/* Map */}
          <div className="h-[420px]">
            <GeoWidget />
          </div>

        </div>
      </main>

      <TimeSlider />
    </div>
  );
}
