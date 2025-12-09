'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface EditTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonioId: string;
  initialData: {
    titulo: string;
    texto: string;
    calificacion: number;
  };
  onSave: () => void;
}

export function EditTestimonialModal({
  isOpen,
  onClose,
  testimonioId,
  initialData,
  onSave,
}: EditTestimonialModalProps) {
  const [titulo, setTitulo] = useState(initialData.titulo);
  const [texto, setTexto] = useState(initialData.texto);
  const [calificacion, setCalificacion] = useState(initialData.calificacion);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitulo(initialData.titulo);
    setTexto(initialData.texto);
    setCalificacion(initialData.calificacion);
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!texto.trim()) {
      toast.error('El texto del testimonio es obligatorio');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${testimonioId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: titulo.trim() || null,
          texto: texto.trim(),
          calificacion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar');
      }

      toast.success('Testimonio actualizado exitosamente');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar el testimonio';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Editar Testimonio</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Título (opcional)
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Excelente servicio"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Texto del testimonio *
            </label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe el testimonio aquí..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Calificación: {calificacion} ⭐
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={calificacion}
              onChange={(e) => setCalificacion(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
