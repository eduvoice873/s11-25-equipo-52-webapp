"use client";

import { DashboardStatsCard } from "./DashboardStatsCard";
import { useDashboardStats } from "@/hooks/swr/useDashboardStats";

export default function DashboardStatsSection() {
  const { stats, isLoading } = useDashboardStats();

  const statsList = [
    { title: "Total Videos", value: stats?.videos ?? "—", key: "videos" },
    { title: "Total Texto", value: stats?.textos ?? "—", key: "textos" },
    { title: "Total Testimonios", value: stats?.testimonios ?? "—", key: "testimonios" },
    { title: "Total Categorías", value: stats?.spaces ?? "—", key: "spaces" },
    { title: "Plan Actual", value: stats?.plan ?? "Free", key: "plan" },
    { title: "Uso del Plan", value: stats ? `${stats.usage}%` : "—", key: "usage" },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsList.map((stat) => (
          <div
            key={stat.key}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-pulse h-24"
          />
        ))}
      </div>
    );
  }

  return (
    <section
      aria-label="Estadísticas del dashboard"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
    >
      {statsList.map((stat) => (
        <DashboardStatsCard key={stat.key} title={stat.title} value={stat.value} />
      ))}
    </section>
  );
}
