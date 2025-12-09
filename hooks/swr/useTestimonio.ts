// hooks/swr/useTestimonio.ts
import type { Testimonio } from "@/app/generated/prisma";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useTestimonio() {
  const { data, mutate, ...args } = useSWR("/api/testimonials", fetcher);

  const testimonials: Testimonio[] = data ?? [];

  /**
   * Crea un nuevo testimonio
   * @param nuevoTestimonio Datos del testimonio a crear
   * @returns Promesa con el testimonio creado
   */
  const crearTestimonio = async (nuevoTestimonio: Omit<Testimonio, "id">) => {
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTestimonio),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear el testimonio");
      }

      const testimonioCreado = await response.json();
      mutate([...testimonials, testimonioCreado], false);
      return testimonioCreado;
    } catch (error) {
      console.error("Error al crear testimonio:", error);
      throw error;
    }
  };

  /**
   * Actualiza un testimonio existente
   * @param id ID del testimonio a actualizar
   * @param datosActualizados Datos a actualizar
   * @returns Promesa con el testimonio actualizado
   */
  const actualizarTestimonio = async (id: string, datosActualizados: Partial<Testimonio>) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al actualizar el testimonio");
      }

      const testimonioActualizado = await response.json();
      mutate(
        testimonials.map((t) => (t.id === id ? testimonioActualizado : t)),
        false
      );
      return testimonioActualizado;
    } catch (error) {
      console.error("Error al actualizar testimonio:", error);
      throw error;
    }
  };

  /**
   * Elimina un testimonio
   * @param id ID del testimonio a eliminar
   * @returns Promesa que se resuelve cuando se completa la eliminación
   */
  const eliminarTestimonio = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar el testimonio");
      }

      mutate(testimonials.filter((t) => t.id !== id), false);
      return true;
    } catch (error) {
      console.error("Error al eliminar testimonio:", error);
      throw error;
    }
  };

  return {
    testimonials,
    crearTestimonio,
    actualizarTestimonio,
    eliminarTestimonio,
    mutate,
    ...args,
  };
}