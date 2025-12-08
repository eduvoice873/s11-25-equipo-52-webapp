import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    users: data || [],
    isLoading,
    error,
    mutate,
  };
}
