"use client";

export function DashboardStatsCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-blue-800">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    </div>
  );
}
