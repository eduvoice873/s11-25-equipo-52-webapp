import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

const PERFIL_API_URL = "/api/perfil";

export function usePerfil() {
  const { data: session } = useSession();

  // Fetcher personalizado que agrega el email en el header
  const customFetcher = useCallback(
    async (url: string) => {
      if (!session?.user?.email) {
        throw new Error("No autenticado");
      }

      const response = await fetch(url, {
        headers: {
          "x-user-email": session.user.email,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return response.json();
    },
    [session?.user?.email]
  );

  const { data, error, isLoading, mutate } = useSWR(
    session?.user?.email ? PERFIL_API_URL : null,
    customFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minuto
    }
  );

  const isError = !!error;
  const perfil = data || null;

  // Actualizar perfil del usuario
  const updatePerfil = useCallback(
    async (updatedData: Partial<typeof perfil>) => {
      try {
        if (!session?.user?.email) {
          throw new Error("No autenticado");
        }

        const response = await fetch(PERFIL_API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": session.user.email,
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al actualizar el perfil");
        }

        const updatedPerfil = await response.json();
        mutate(updatedPerfil.user || updatedPerfil, false);
        return updatedPerfil;
      } catch (err) {
        console.error("Error actualizando perfil:", err);
        throw err;
      }
    },
    [mutate, session?.user?.email]
  );

  // Recargar perfil
  const refreshPerfil = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    perfil,
    isLoading,
    isError,
    error,
    mutate,
    updatePerfil,
    refreshPerfil,
  };
}
