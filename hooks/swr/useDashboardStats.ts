import useSWR from "swr";
import type { DashboardStats } from "@/types/dashboard";
import { fetcher } from "@/lib/fetcher";

export function useDashboardStats() {
  const { data, ...args } = useSWR<DashboardStats>("/api/dashboard/stats", fetcher);

  return {
    stats: data,
    ...args,
  };
}
