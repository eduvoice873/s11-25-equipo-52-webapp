'use client';

import { Search } from "lucide-react";

interface TestimonialFiltersProps {
  filter: string;
  search: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
  stats?: {
    total: number;
    pendientes: number;
    aprobados: number;
    rechazados: number;
  };
}

export function TestimonialFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
  stats
}: TestimonialFiltersProps) {
  const filters = [
    { value: 'all', label: 'Todos', count: stats?.total },
    { value: 'pending', label: 'Pendientes', count: stats?.pendientes },
    { value: 'approved', label: 'Aprobados', count: stats?.aprobados },
    { value: 'rejected', label: 'Rechazados', count: stats?.rechazados },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {f.label}
            {f.count !== undefined && (
              <span className={`ml-2 ${filter === f.value ? 'text-blue-100' : 'text-gray-500'
                }`}>
                ({f.count})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por título, texto o nombre..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
