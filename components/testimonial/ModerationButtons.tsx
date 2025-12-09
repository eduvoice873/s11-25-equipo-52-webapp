'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface ModerationButtonsProps {
  respuestaId: string;
  onSuccess?: () => void;
}

export function ModerationButtons({ respuestaId, onSuccess }: ModerationButtonsProps) {
  const [loading, setLoading] = useState(false);

  const handleModerate = async (decision: 'aprobar' | 'rechazar') => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${respuestaId}/moderate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decision }),
      });

      if (!response.ok) {
        throw new Error('Error al moderar');
      }

      const data = await response.json();

      if (decision === 'aprobar') {
        toast.success('Testimonio aprobado y convertido exitosamente');
      } else {
        toast.success('Testimonio rechazado');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al moderar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleModerate('aprobar')}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Aprobar'}
      </button>
      <button
        onClick={() => handleModerate('rechazar')}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Rechazar'}
      </button>
    </div>
  );
}
