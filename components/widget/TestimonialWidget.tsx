'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface WidgetProps {
  categoriaId?: string;
  organizacionId?: string;
  limit?: number;
  destacados?: boolean;
  theme?: 'light' | 'dark';
}

interface Testimonio {
  id: string;
  titulo: string;
  texto: string;
  calificacion: number;
  persona: {
    nombreCompleto: string;
    fotoUrl?: string;
  };
  medios: Array<{
    url: string;
    tipo: string;
  }>;
}

export function TestimonialWidget({
  categoriaId,
  organizacionId,
  limit = 10,
  destacados = false,
  theme = 'light',
}: WidgetProps) {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (categoriaId) params.append('categoriaId', categoriaId);
    if (organizacionId) params.append('organizacionId', organizacionId);
    params.append('limit', limit.toString());
    if (destacados) params.append('destacados', 'true');

    fetch(`/api/public/testimonials?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTestimonios([]);
        } else if (Array.isArray(data)) {
          setTestimonios(data);
          setError(null);
        } else {
          console.error('La respuesta no es un array:', data);
          setError('Formato de datos inválido');
          setTestimonios([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar testimonios:', err);
        setError(err.message || 'Error al cargar testimonios');
        setTestimonios([]);
        setLoading(false);
      });
  }, [categoriaId, organizacionId, limit, destacados]);

  if (loading) {
    return (
      <div className={`p-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
        Cargando testimonios...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-8 text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
        <p className="font-semibold mb-2">Error al cargar testimonios</p>
        <p className="text-sm">{error}</p>
        {!categoriaId && !organizacionId && (
          <p className="text-xs mt-2 opacity-75">Sugerencia: Añade ?categoriaId=xxx o ?organizacionId=xxx a la URL</p>
        )}
      </div>
    );
  }

  if (!Array.isArray(testimonios) || testimonios.length === 0) {
    return (
      <div className={`p-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
        <p className="mb-2">No hay testimonios disponibles</p>
        {!categoriaId && !organizacionId && (
          <p className="text-sm opacity-75">Configura categoriaId u organizacionId para mostrar testimonios</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {testimonios.map((testimonio) => (
        <div
          key={testimonio.id}
          className={`rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
        >
          <div className="flex items-center mb-4">
            {testimonio.persona.fotoUrl ? (
              <img
                src={testimonio.persona.fotoUrl}
                alt={testimonio.persona.nombreCompleto}
                className="w-12 h-12 rounded-full mr-3"
              />
            ) : (
              <div className={`w-12 h-12 rounded-full mr-3 flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                {testimonio.persona.nombreCompleto.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold">{testimonio.persona.nombreCompleto}</h3>
              <div className="flex">
                {Array.from({ length: testimonio.calificacion }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {testimonio.titulo && (
            <h4 className="font-bold mb-2">{testimonio.titulo}</h4>
          )}

          <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {testimonio.texto}
          </p>

          {testimonio.medios.length > 0 && testimonio.medios[0].tipo === 'imagen' && (
            <img
              src={testimonio.medios[0].url}
              alt="Testimonio"
              className="w-full h-48 object-cover rounded"
            />
          )}

          {testimonio.medios.length > 0 && testimonio.medios[0].tipo === 'video' && (
            <video
              src={testimonio.medios[0].url}
              controls
              className="w-full h-48 rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
}
