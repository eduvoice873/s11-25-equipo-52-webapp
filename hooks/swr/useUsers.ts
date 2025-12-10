import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { toast } from 'sonner';

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  const createEditor = async (userData: {
    name: string;
    email: string;
    password: string;
    confirm: string;
    image?: string | null;
  }) => {
    try {
      const response = await fetch('/api/users/editors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Manejar errores específicos
        if (result.field === 'email') {
          throw new Error(
            'Este email ya está registrado. Por favor usa otro email.'
          );
        }
        throw new Error(
          result.error || result.message || 'Error al crear el usuario'
        );
      }

      toast.success('Editor creado exitosamente');
      mutate();
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al crear el usuario';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    users: data || [],
    isLoading,
    error,
    mutate,
    createEditor,
  };
}
