import type { Prisma } from "@/app/generated/prisma";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useCategory(id: string) {
  const { data, ...args } = useSWR(`/api/categories/${id}`, fetcher);

  const category: Prisma.CategoriaGetPayload<{ include: { testimonios: true } }> = data;

  return {
    category,
    ...args,
  };
}
