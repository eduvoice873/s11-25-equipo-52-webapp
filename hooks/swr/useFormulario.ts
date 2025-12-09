// hooks/useFormulario.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error al cargar");
    return res.json();
  });

export function useFormulario(formularioId?: string) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Solo hacer fetch si tenemos un ID válido (no "nuevo")
  const shouldFetch = formularioId && formularioId !== "nuevo";
  const {
    data: formularioData,
    error,
    mutate,
  } = useSWR(
    shouldFetch ? `/api/formularios/admin/${formularioId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000, // Evitar llamadas duplicadas en 10 segundos
    }
  );

  const getFormularioAdmin = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/formularios/admin/${id}`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al cargar el formulario");
      return data;
    } catch (error) {
      console.error("Error al obtener el formulario:", error);
      toast.error("No se pudo cargar el formulario");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const crearFormulario = async (formData: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/formularios/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al crear el formulario");

      toast("Formulario creado correctamente");

      // El endpoint retorna { success: true, formulario: {...} }
      const formularioId = data.formulario?.id;
      if (formularioId) {
        router.push(`/formulario/${formularioId}/edit`);
      }
      return data.formulario;
    } catch (error) {
      console.error("Error al crear el formulario:", error);
      toast("No se pudo crear el formulario");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const actualizarFormulario = async (id: string, formData: any) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/formularios/admin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al actualizar el formulario");

      toast("Formulario actualizado correctamente");

      return data;
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
      toast("No se pudo actualizar el formulario");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    formulario: formularioData,
    isLoading: !error && !formularioData && shouldFetch,
    isError: error,
    getFormularioAdmin,
    crearFormulario,
    actualizarFormulario,
    loading,
    mutate,
  };
}
