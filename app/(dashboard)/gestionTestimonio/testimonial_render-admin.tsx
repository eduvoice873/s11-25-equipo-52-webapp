'use client';

import { useEffect, useState } from "react";
import { AdminTestimonial, AdminTestimonialProps } from "@/components/ui/testimonial/Admin";
import { X } from "lucide-react";

interface TestimonialRenderAdminProps {
  initialTestimonials: any[];
  filter?: string;
  search?: string;
}

interface ExtendedAdminTestimonialProps extends AdminTestimonialProps {
  id: string;
  testimonioId?: string;
}

export function TestimonialRender_admin({
  initialTestimonials,
  filter = 'all',
  search = ''
}: TestimonialRenderAdminProps) {
  const [selected, setSelected] = useState<ExtendedAdminTestimonialProps | null>(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [loading, setLoading] = useState(false);

  const refreshTestimonials = () => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.append("filter", filter);
    if (search) params.append("search", search);

    fetch(`/api/respuestas-formulario/list?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        const transformed = data.map((item: any) => ({
          person: {
            nombreCompleto: item.nombreCompleto || item.persona?.nombreCompleto || 'Sin nombre',
            correo: item.correo || item.persona?.correo || '',
            role: ''
          },
          testimonial: {
            titulo: item.titulo,
            texto: item.texto,
            estado: item.estado,
            media: item.imagenUrl ? {
              type: 'image',
              previewUrl: item.imagenUrl
            } : item.videoUrl ? {
              type: 'video',
              previewUrl: item.videoUrl
            } : undefined,
            destacado: false,
            calificacion: item.calificacion,
            date: item.creadoEn,
            tags: [],
            history: item.revisiones?.map((rev: any) => ({
              user: rev.revisor?.name || rev.revisor?.email || 'Usuario',
              message: rev.decision === 'aprobar' ? 'aprobó el testimonio' :
                rev.decision === 'rechazar' ? 'rechazó el testimonio' :
                  `cambió el estado a ${rev.decision}`,
              notes: rev.notas,
              time: new Date(rev.creadoEn).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            })) || []
          },
          id: item.id,
          testimonioId: item.testimonioId,
          preguntas: item.formulario?.preguntas || [],
          respuestasPreguntas: item.respuestasPreguntas || null
        }));
        setTestimonials(transformed);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.append("filter", filter);
    if (search) params.append("search", search);

    setLoading(true);
    fetch(`/api/respuestas-formulario/list?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        console.log(' Datos recibidos del API:', data);
        const transformed = data.map((item: any) => {
          console.log(' Item individual:', {
            preguntas: item.formulario?.preguntas,
            respuestasPreguntas: item.respuestasPreguntas,
            titulo: item.titulo
          });
          return {
            person: {
              nombreCompleto: item.nombreCompleto || item.persona?.nombreCompleto || 'Sin nombre',
              correo: item.correo || item.persona?.correo || '',
              role: ''
            },
            testimonial: {
              titulo: item.titulo,
              texto: item.texto,
              estado: item.estado,
              media: item.imagenUrl ? {
                type: 'image',
                previewUrl: item.imagenUrl
              } : item.videoUrl ? {
                type: 'video',
                previewUrl: item.videoUrl
              } : undefined,
              destacado: false,
              calificacion: item.calificacion,
              date: item.creadoEn,
              tags: [],
              history: item.revisiones?.map((rev: any) => ({
                user: rev.revisor?.name || rev.revisor?.email || 'Usuario',
                message: rev.decision === 'aprobar' ? 'aprobó el testimonio' :
                  rev.decision === 'rechazar' ? 'rechazó el testimonio' :
                    `cambió el estado a ${rev.decision}`,
                notes: rev.notas,
                time: new Date(rev.creadoEn).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              })) || []
            },
            id: item.id,
            testimonioId: item.testimonioId,
            preguntas: item.formulario?.preguntas || [],
            respuestasPreguntas: item.respuestasPreguntas || null
          };
        });
        console.log(' Datos transformados:', transformed);
        setTestimonials(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener respuestas:', err);
        setLoading(false);
      });
  }, [filter, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron testimonios</p>
      </div>
    );
  }

  /* INICIO TESTIMONIOS EN PANTALLA COMPLETA */
  if (!selected) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {testimonials.map((item, i) => (
          <AdminTestimonial
            key={i}
            person={item.person}
            testimonial={item.testimonial}
            variant="mini"
            onClick={() => setSelected(item)}
          />
        ))}
      </div>
    );
  }

  /* EDITOR & TESTIMONIOS EN UNA COLUMNA */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen relative">
      {/* Columna izquierda: mini con scroll */}
      <div className="col-span-1 overflow-y-auto space-y-4 p-4">
        {testimonials.map((item, i) => (
          <AdminTestimonial
            key={i}
            person={item.person}
            testimonial={item.testimonial}
            variant="mini"
            onClick={() => setSelected(item)}
            isActive={item.person.correo === selected.person.correo}
          />
        ))}
      </div>

      {/* Botón cerrar */}
      <button
        onClick={() => setSelected(null)}
        className="absolute -top-1 -right-1 z-50"
      >
        <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black" />
      </button>

      {/* Columna derecha: full */}
      <div className="col-span-2 flex justify-center items-start p-6">
        <div className="max-w-3xl w-full space-y-4">
          <AdminTestimonial
            person={selected.person}
            testimonial={selected.testimonial}
            variant="full"
            respuestaId={selected.id}
            testimonioId={selected.testimonioId}
            preguntas={selected.preguntas}
            respuestasPreguntas={selected.respuestasPreguntas}
            onApprove={() => {
              setSelected(null);
              refreshTestimonials();
            }}
            onReject={() => {
              setSelected(null);
              refreshTestimonials();
            }}
          />
        </div>
      </div>
    </div>
  );
}