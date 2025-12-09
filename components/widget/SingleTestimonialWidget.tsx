'use client';

import { useEffect, useState } from 'react';

interface SingleTestimonialWidgetProps {
  testimonioId: string;
  theme?: 'light' | 'dark';
}

interface Testimonio {
  id: string;
  titulo?: string;
  texto: string;
  calificacion?: number;
  fechaCreacion: string;
  persona: {
    nombreCompleto: string;
    fotoUrl?: string;
  };
  medios: Array<{
    url: string;
    tipo: 'imagen' | 'video';
  }>;
  categoria?: {
    nombre: string;
  };
}

export function SingleTestimonialWidget({ testimonioId, theme = 'light' }: SingleTestimonialWidgetProps) {
  const [testimonio, setTestimonio] = useState<Testimonio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonio = async () => {
      try {
        const response = await fetch(`/api/public/testimonials/${testimonioId}`);
        if (!response.ok) {
          throw new Error('Testimonio no encontrado');
        }
        const data = await response.json();
        setTestimonio(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar testimonio');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonio();
  }, [testimonioId]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
        <div className="animate-pulse">Cargando testimonio...</div>
      </div>
    );
  }

  if (error || !testimonio) {
    return (
      <div className={`flex items-center justify-center p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
        <div className="text-red-500">{error || 'No se pudo cargar el testimonio'}</div>
      </div>
    );
  }

  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`${bgClass} ${textClass} rounded-lg shadow-lg p-6 max-w-2xl mx-auto`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
          {testimonio.persona.nombreCompleto.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{testimonio.persona.nombreCompleto}</h3>
          {testimonio.categoria && (
            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {testimonio.categoria.nombre}
            </span>
          )}
        </div>
      </div>

      {/* Calificación */}
      {testimonio.calificacion && (
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonio.calificacion! ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Título */}
      {testimonio.titulo && (
        <h2 className="text-xl font-bold mb-3">{testimonio.titulo}</h2>
      )}

      {/* Texto */}
      <p className={`${textSecondaryClass} leading-relaxed mb-4`}>{testimonio.texto}</p>

      {/* Media */}
      {testimonio.medios.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          {testimonio.medios[0].tipo === 'imagen' ? (
            <img
              src={testimonio.medios[0].url}
              alt="Testimonio"
              className="w-full h-auto max-h-96 object-cover"
            />
          ) : (
            <video
              src={testimonio.medios[0].url}
              controls
              className="w-full h-auto max-h-96"
            >
              Tu navegador no soporta videos.
            </video>
          )}
        </div>
      )}

      {/* Fecha */}
      <div className={`text-sm ${textSecondaryClass} mt-4`}>
        {new Date(testimonio.fechaCreacion).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${borderClass} text-center`}>
        <p className="text-xs text-gray-500">
          Powered by{' '}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            VoicesHub
          </a>
        </p>
      </div>
    </div>
  );
}
