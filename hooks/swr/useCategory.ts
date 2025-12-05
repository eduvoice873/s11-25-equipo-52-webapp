import type { Prisma } from "@/app/generated/prisma";
import { fetcher } from "@/lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "sonner";

export function useCategory(id: string) {
  const { mutate } = useSWRConfig();
  const { data, ...args } = useSWR(`/api/categories/${id}`, fetcher);

  const category: Prisma.CategoriaGetPayload<{
    include: {
      testimonios: {
        include: {
          persona: {
            select: {
              id: true;
              nombreCompleto: true;
            };
          };
        };
      };
      formularios: {
        include: {
          respuestas: {
            orderBy: { creadoEn: "desc" };
            include: {
              persona: {
                select: {
                  id: true;
                  nombreCompleto: true;
                  correo: true;
                  fotoUrl: true;
                };
              };
            };
          };
        };
      };
      preguntas: true;
    };
  }> = data;


  const deleteCategory = async () => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      // Invalidate the categories list cache and dashboard stats
      await Promise.all([
        mutate("/api/categories"),
        mutate("/api/dashboard/stats"),
        mutate(`/api/categories/${id}`),
      ]);

      toast.success("Categoría eliminada correctamente");
      return true;
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      toast.error("Error al eliminar la categoría");
      throw error;
    }
  };

  const updatedCategory = async (updatedCategory: Prisma.CategoriaUpdateInput) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      // Invalidate both the specific category and the categories list caches plus stats
      await Promise.all([
        mutate(`/api/categories/${id}`),
        mutate("/api/categories"),
        mutate("/api/dashboard/stats"),
      ]);

      toast.success("Categoría actualizada correctamente");
      return true;
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      toast.error("Error al actualizar la categoría");
      throw error;
    }
  }

  return {
    category,
    ...args,
    deleteCategory,
    updatedCategory,
  };
}
