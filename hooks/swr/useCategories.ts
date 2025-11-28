import type { Categoria } from "@/app/generated/prisma";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useCategories() {
  const { data, ...args } = useSWR("/api/categories", fetcher);

  const categories: Categoria[] = data;

  return {
    categories,
    ...args,
  };
}
