"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock, CheckCircle, XCircle, FileText, LayoutList } from "lucide-react";

interface Stats {
  totalTestimonials: number;
  pending: number;
  approved: number;
  rejected: number;
  totalForms: number;
  totalCategories: number;
}

export default function DashboardStatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          totalTestimonials: data.testimonios,
          pending: data.pending,
          approved: data.approved,
          rejected: data.rejected,
          totalForms: data.totalForms,
          totalCategories: data.totalCategories || 0,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <StatsSkeleton />;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        icon={<BarChart3 className="w-5 h-5" />}
        title="Total"
        value={stats.totalTestimonials}
        color="blue"
      />
      <StatCard

        icon={<LayoutList className="w-5 h-5" />}
        title="Categorias"
        value={stats.totalCategories}
        color="yellow"

      />
      <StatCard
        icon={<CheckCircle className="w-5 h-5" />}
        title="Aprobados"
        value={stats.approved}
        color="green"
      />
      <StatCard
        icon={<XCircle className="w-5 h-5" />}
        title="Rechazados"
        value={stats.rejected}
        color="red"
      />
      <StatCard
        icon={<FileText className="w-5 h-5" />}
        title="Formularios"
        value={stats.totalForms}
        color="indigo"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
  highlight = false
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
  highlight?: boolean;
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${highlight ? 'ring-2 ring-yellow-400 ring-offset-2 animate-pulse' : ''
      }`}>
      <div className={`inline-flex p-3 rounded-lg mb-3 ${colors[color as keyof typeof colors]}`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
      ))}
    </div>
  );
}
