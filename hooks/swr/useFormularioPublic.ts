import { useState, useEffect } from 'react';

interface FormularioPublico {
  id: string;
  nombreFormulario: string;
  descripcion: string;
  estado: string;
  permitirTexto: boolean;
  permitirTextoImagen: boolean;
  permitirVideo: boolean;
  pedirNombre: boolean;
  pedirCorreo: boolean;
  mensajeGracias: string;
  organizacionId: string;
  preguntas: any[];
}

export function useFormularioPublico(slug: string) {
  const [formulario, setFormulario] = useState<FormularioPublico | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function cargarFormulario() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        const response = await fetch(`/api/formularios/publico/${slug}`);

        if (!response.ok) {
          throw new Error('No se pudo cargar el formulario');
        }

        const data = await response.json();
        setFormulario(data);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      cargarFormulario();
    }
  }, [slug]);

  return { formulario, isLoading, isError, errorMessage };
}