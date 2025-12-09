'use client';

import { useState } from "react";
import { RatingStars } from "./ratingStars"
import { theme } from "../theme"
import { Heart, Share2, Edit } from "lucide-react";
import { toast } from "sonner";
import { EmbedCodeModal } from "@/components/testimonial/EmbedCodeModal";
import { EditTestimonialModal } from "@/components/testimonial/EditTestimonialModal";

export type TestimonialStatus =
  | "borrador"
  | "aprobado"
  | "rechazado"
  | "archivado"
  | "publicado"
  | "en_revision"
  | "pendiente";

export interface AdminTestimonialProps {
  person: {
    nombreCompleto: string
    correo: string
    role?: string
  };
  testimonial: {
    titulo?: string
    texto: string
    estado: TestimonialStatus
    media?: {
      type: "image" | "video";
      previewUrl: string;
    };
    destacado: boolean
    calificacion?: number
    date: string
    tags?: string[]
    history?: {
      user: string
      message: string
      notes?: string
      time: string
    }[]
  }
  variant?: "mini" | "full"
  className?: string
  onClick?: () => void
  isActive?: boolean
  respuestaId?: string
  testimonioId?: string
  preguntas?: Array<{
    id: string
    texto: string
    tipo: string
    orden: number
  }>
  respuestasPreguntas?: Record<string, any> | null
  onApprove?: () => void
  onReject?: () => void
  onArchive?: () => void
  onSpam?: () => void
  onToggleFeatured?: () => void
  onShare?: () => void
}

const statusStyles: Record<TestimonialStatus, { border: string; text: string; label: string }> = {
  borrador: {
    border: theme.colors.mediumgray,
    text: theme.colors.mediumgray,
    label: "Borrador",
  },
  aprobado: {
    border: theme.colors.green,
    text: theme.colors.green,
    label: "Aprobado",
  },
  rechazado: {
    border: theme.colors.red,
    text: theme.colors.red,
    label: "Rechazado",
  },
  archivado: {
    border: theme.colors.darkgray,
    text: theme.colors.darkgray,
    label: "Archivado",
  },
  publicado: {
    border: theme.colors.lightBlue,
    text: theme.colors.lightBlue,
    label: "Publicado",
  },
  en_revision: {
    border: theme.colors.yellow,
    text: theme.colors.yellow,
    label: "En revisión",
  },
  pendiente: {
    border: theme.colors.orange,
    text: theme.colors.orange,
    label: "Pendiente",
  },
};


export function AdminTestimonial({
  person: {
    nombreCompleto,
    role,
    correo,
  },
  testimonial: {
    titulo,
    texto,
    estado = "borrador",
    media,
    destacado = false,
    calificacion = 0,
    date,
    tags,
    history = []
  },
  variant = "mini",
  className = "",
  onClick,
  isActive = false,
  respuestaId,
  testimonioId,
  preguntas = [],
  respuestasPreguntas = null,
  onApprove,
  onReject,
  onArchive,
  onSpam,
  onToggleFeatured,
  onShare
}: AdminTestimonialProps) {
  console.log(' AdminTestimonial props:', {
    variant,
    preguntas,
    respuestasPreguntas,
    titulo
  });

  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(destacado);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [approvedTestimonioId, setApprovedTestimonioId] = useState<string | undefined>(testimonioId);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<'aprobar' | 'rechazar' | null>(null);
  const [notes, setNotes] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const openNotesModal = (decision: 'aprobar' | 'rechazar') => {
    setPendingDecision(decision);
    setNotes('');
    setShowNotesModal(true);
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
    setPendingDecision(null);
    setNotes('');
  };

  const handleModerate = async (decision: 'aprobar' | 'rechazar', notas?: string) => {
    if (!respuestaId || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${respuestaId}/moderate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, notas }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al moderar');
      }

      toast.success(data.message);

      // Si se aprobó, guardar el ID del testimonio creado
      if (decision === 'aprobar' && data.testimonio?.id) {
        setApprovedTestimonioId(data.testimonio.id);
      }

      closeNotesModal();

      if (decision === 'aprobar' && onApprove) onApprove();
      if (decision === 'rechazar' && onReject) onReject();
    } catch (error) {
      console.error('Error completo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al moderar el testimonio';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!respuestaId || loading) {
      toast.info('Función de archivar en desarrollo');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${respuestaId}/actions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archive' }),
      });

      if (!response.ok) throw new Error('Error al archivar');

      const data = await response.json();
      toast.success(data.message);
      if (onArchive) onArchive();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al archivar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  const handleSpam = async () => {
    if (!respuestaId || loading) {
      toast.warning('Marcado como spam');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${respuestaId}/actions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'spam' }),
      });

      if (!response.ok) throw new Error('Error al marcar como spam');

      const data = await response.json();
      toast.warning(data.message);
      if (onSpam) onSpam();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al marcar como spam');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (newStatus: 'pendiente' | 'aprobar' | 'rechazar') => {
    if (!respuestaId || loading) return;

    if (newStatus === 'pendiente') {
      // Cambiar a pendiente directamente
      setLoading(true);
      try {
        const response = await fetch(`/api/testimonials/${respuestaId}/change-status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'pendiente' }),
        });

        if (!response.ok) throw new Error('Error al cambiar estado');

        const data = await response.json();
        toast.success('Estado cambiado a pendiente');
        if (onApprove) onApprove(); // Recargar lista
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cambiar el estado');
      } finally {
        setLoading(false);
      }
    } else {
      // Para aprobar o rechazar, abrir el modal de notas
      openNotesModal(newStatus);
    }
  };

  const handleShare = () => {
    // Si es un testimonio aprobado con approvedTestimonioId, mostrar modal de embed
    if (approvedTestimonioId && estado === 'aprobado') {
      setShowEmbedModal(true);
      return;
    }

    // Fallback a compartir nativo o copiar URL
    if (navigator.share) {
      navigator.share({
        title: titulo || 'Testimonio',
        text: texto,
      }).catch(() => toast.error('Error al compartir'));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado al portapapeles');
    }
    if (onShare) onShare();
  }; const handleToggleFeatured = async () => {
    if (!respuestaId || loading) {
      setIsFeatured(!isFeatured);
      toast.success(isFeatured ? 'Removido de destacados' : 'Marcado como destacado');
      if (onToggleFeatured) onToggleFeatured();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials/${respuestaId}/actions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-featured' }),
      });

      if (!response.ok) throw new Error('Error al destacar');

      const data = await response.json();
      setIsFeatured(!isFeatured);
      toast.success(data.message);
      if (onToggleFeatured) onToggleFeatured();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar estado destacado');
    } finally {
      setLoading(false);
    }
  };
  if (variant === "mini") {
    return (
      <div onClick={onClick} className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white
      cursor-pointer hover:scale-[1.02]
      ${isActive ? "border-blue-600 ring-2 ring-blue-300" : "border-gray-200"}
       ${className}`}>
        <div className="flex justify-between items-center mb-3">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs justify-center">
              {tags.map((tag) => (
                <span key={tag} style={{
                  borderColor: theme.colors.lightBlue,
                  color: theme.colors.lightBlue,
                }} className="px-2 py-1 border rounded-lg">
                  {tag}
                </span>
              ))}
              <button
                className="px-2 py-1 border rounded-lg text-xs"
                style={{
                  borderColor: statusStyles[estado].border,
                  color: statusStyles[estado].text,
                }}>
                {statusStyles[estado].label}
              </button>
            </div>
          )}
          {destacado === true && (
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
          )}
        </div>

        {media && (
          <div className="mb-3">
            {media.type === "image" && (
              <img
                src={media.previewUrl}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}

            {media.type === "video" && (
              <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden group">
                <video
                  src={media.previewUrl}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-gray-800 border-y-6 border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-sm line-clamp-3 mb-3 font-semibold">{titulo}</p>
        <p className="text-sm line-clamp-3 mb-3">{texto}</p>

        <div className="flex justify-between items-center">
          <div style={{ color: theme.colors.lightBlue }}>
            <p className="font-semibold text-sm">{nombreCompleto}</p>
            {role && <p className="text-xs">{role}</p>}
            {correo && <p className="text-xs">{correo}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-left">
            <RatingStars rating={calificacion} className="mt-2"></RatingStars>
          </div>
          <div className="text-right">
            <p style={{ color: theme.colors.lightBlue }} className="text-xs">{date}</p>
          </div>
        </div>
      </div>
    );

  }

  return (
    <div className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white ${className}`}>
      <div className="flex justify-between mb-4">
        <div style={{ color: theme.colors.lightBlue }}>
          <p className="font-bold">{nombreCompleto}</p>
          {role && <p className="text-sm">{role}</p>}
          {correo && <p className="text-sm">{correo}</p>}
        </div>

        <div className="text-right">

          <button
            className="px-2 py-1 border rounded-lg text-xs"
            style={{
              borderColor: statusStyles[estado].border,
              color: statusStyles[estado].text,
            }}>
            {statusStyles[estado].label}
          </button>

          <p style={{ color: theme.colors.lightBlue }} className="text-xs mt-1">{date}</p>

        </div>

      </div>



      <div className="flex gap-4 mb-4">

        <div className="flex-1">
          <RatingStars rating={calificacion} className="mb-2"></RatingStars>
          <p className="font-semibold">{titulo}</p>
          <p>{texto}</p>
        </div>

        {media && (
          <div className="w-1/3">
            {media.type === "image" && (
              <img
                src={media.previewUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded"
              />
            )}
            {media.type === "video" && (
              <video
                src={media.previewUrl}
                controls
                className="w-full h-auto max-h-48 rounded"
                preload="metadata"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
          </div>
        )}
      </div>

      {/* Sección de respuestas a preguntas */}
      {preguntas && preguntas.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-3 text-blue-900">Respuestas a preguntas del formulario</h3>
          {respuestasPreguntas ? (
            <div className="space-y-3">
              {preguntas
                .sort((a, b) => a.orden - b.orden)
                .map((pregunta) => {
                  const respuesta = respuestasPreguntas[pregunta.id];
                  if (!respuesta) return null;

                  return (
                    <div key={pregunta.id} className="bg-white p-3 rounded border border-blue-100">
                      <p className="text-sm font-medium text-gray-700 mb-1">{pregunta.texto}</p>
                      <p className="text-sm text-gray-900">{respuesta}</p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                ℹ️ Este testimonio fue creado antes de que se agregaran las preguntas al formulario, por lo que no hay respuestas registradas.
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Preguntas del formulario: {preguntas.map(p => p.texto).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}


      {
        tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {tags.map(tag => (
              <span key={tag} style={{
                borderColor: theme.colors.lightBlue,
                color: theme.colors.lightBlue,
              }} className="px-2 py-1 border rounded-lg">
                {tag}
              </span>
            ))}
            <button id="btn-addtag" style={{ color: theme.colors.lightBlue }} className="text-xs" >
              + Añadir etiqueta
            </button>
          </div>
        )
      }


      <div className="flex gap-2 mb-4 justify-between flex-wrap">
        {/* Botones de moderación según el estado */}
        <div className="flex gap-2 flex-wrap">
          {estado === 'pendiente' && (
            <>
              <button
                onClick={() => handleChangeStatus('aprobar')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.green,
                  color: theme.colors.green,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Aprobar'}
              </button>
              <button
                onClick={() => handleChangeStatus('rechazar')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.red,
                  color: theme.colors.red,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Rechazar'}
              </button>
            </>
          )}

          {estado === 'aprobado' && (
            <>
              <button
                onClick={() => handleChangeStatus('pendiente')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.orange,
                  color: theme.colors.orange,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cambiar a Pendiente
              </button>
              <button
                onClick={() => handleChangeStatus('rechazar')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.red,
                  color: theme.colors.red,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rechazar
              </button>
            </>
          )}

          {estado === 'rechazado' && (
            <>
              <button
                onClick={() => handleChangeStatus('pendiente')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.orange,
                  color: theme.colors.orange,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cambiar a Pendiente
              </button>
              <button
                onClick={() => handleChangeStatus('aprobar')}
                disabled={loading}
                style={{
                  borderColor: theme.colors.green,
                  color: theme.colors.green,
                }}
                className="text-xs border px-2 py-1 rounded hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aprobar
              </button>
            </>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleArchive}
            style={{
              borderColor: theme.colors.darkgray,
              color: theme.colors.darkgray,
            }}
            className="text-xs border px-2 py-1 rounded hover:bg-gray-50"
          >
            Archivar
          </button>
          <button
            onClick={handleSpam}
            style={{
              borderColor: theme.colors.orange,
              color: theme.colors.orange,
            }}
            className="text-xs border px-2 py-1 rounded hover:bg-orange-50"
          >
            Spam
          </button>
          {estado === 'aprobado' && approvedTestimonioId && (
            <button
              onClick={() => setShowEditModal(true)}
              style={{
                borderColor: theme.colors.lightBlue,
                color: theme.colors.lightBlue,
              }}
              className="text-xs border px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
          )}

          <button
            onClick={handleShare}
            disabled={estado === 'aprobado' && !approvedTestimonioId}
            title={estado === 'aprobado' && !approvedTestimonioId ? 'Recarga la página para obtener el código embed' : 'Compartir testimonio'}
            style={{
              borderColor: theme.colors.lightBlue,
              color: theme.colors.lightBlue,
              opacity: (estado === 'aprobado' && !approvedTestimonioId) ? 0.5 : 1,
            }}
            className="text-xs border px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            {approvedTestimonioId ? 'Código Embed' : 'Compartir'}
          </button>

          <button
            onClick={handleToggleFeatured}
            style={{
              borderColor: isFeatured ? theme.colors.red : theme.colors.lightBlue,
              color: isFeatured ? theme.colors.red : theme.colors.lightBlue,
              backgroundColor: isFeatured ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
            }}
            className="text-xs border px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-50"
          >
            <Heart className="w-4 h-4" fill={isFeatured ? 'currentColor' : 'none'} />
            {isFeatured ? 'Destacado' : 'Destacar'}
          </button>
        </div>
      </div>


      <h3 className="font-semibold mb-2 border-b">Historial de revisiones</h3>
      {
        history.length === 0 && (
          <p className="text-xs text-gray-500">Sin cambios registrados</p>
        )
      }

      {
        history.map((item, i) => (
          <div key={i} className="text-sm mb-2 border-b pb-1">
            <strong>{item.user}</strong> {item.message}
            {item.notes && <p className="text-xs">Nota: {item.notes}</p>}
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))
      }

      {/* Modal de Notas */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {pendingDecision === 'aprobar' ? 'Aprobar Testimonio' : 'Rechazar Testimonio'}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Notas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agrega comentarios sobre esta decisión..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeNotesModal}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => pendingDecision && handleModerate(pendingDecision, notes || undefined)}
                disabled={loading}
                style={{
                  backgroundColor: pendingDecision === 'aprobar' ? theme.colors.green : theme.colors.red,
                  color: 'white',
                }}
                className="px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Procesando...' : pendingDecision === 'aprobar' ? 'Aprobar' : 'Rechazar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <EmbedCodeModal
        isOpen={showEmbedModal}
        onClose={() => setShowEmbedModal(false)}
        testimonioId={approvedTestimonioId || ''}
        titulo={titulo}
      />

      <EditTestimonialModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        testimonioId={approvedTestimonioId || ''}
        initialData={{
          titulo: titulo || '',
          texto,
          calificacion,
        }}
        onSave={async () => {
          setShowEditModal(false);
          if (onApprove) {
            await onApprove();
          }
        }}
      />
    </div >


  )
}
