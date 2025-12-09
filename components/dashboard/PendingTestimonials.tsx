import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function PendingTestimonials({
  organizacionId
}: {
  organizacionId: string
}) {
  // Obtener respuestas de formulario pendientes
  const pendingTestimonials = await prisma.respuestaFormulario.findMany({
    where: {
      formulario: {
        categoria: { organizacionId },
      },
      estado: "pendiente",
    },
    include: {
      persona: {
        select: {
          nombreCompleto: true,
          correo: true,
        },
      },
      formulario: {
        include: {
          categoria: {
            select: {
              nombre: true,
            },
          },
        },
      },
    },
    orderBy: {
      creadoEn: 'desc',
    },
    take: 5,
  });

  if (pendingTestimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          Pendientes de Revisión
        </h3>
        <p className="text-sm text-gray-500 text-center py-8">
          No hay testimonios pendientes 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          Pendientes ({pendingTestimonials.length})
        </h3>
        <Button asChild variant="ghost" size="sm">
          <Link href="/gestionTestimonio" className="text-blue-600">
            Ver todos
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {pendingTestimonials.map((respuesta) => (
          <Link
            key={respuesta.id}
            href="/gestionTestimonio"
            className="block p-3 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">
                  {respuesta.nombreCompleto || respuesta.persona?.nombreCompleto || 'Anónimo'}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {respuesta.texto || respuesta.titulo}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">
                    {new Date(respuesta.creadoEn).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                    {respuesta.estado}
                  </span>
                  {respuesta.formulario?.categoria && (
                    <span className="text-xs text-gray-500">
                      • {respuesta.formulario.categoria.nombre}
                    </span>
                  )}
                </div>
              </div>
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}