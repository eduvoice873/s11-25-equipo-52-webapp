import { Activity } from "lucide-react";
import prisma from "@/lib/db";

export default async function RecentActivity({
  organizacionId
}: {
  organizacionId: string
}) {
  const recentTestimonials = await prisma.testimonio.findMany({
    where: {
      categoria: {
        organizacionId,
      },
    },
    include: {
      categoria: {
        select: {
          nombre: true,
          titulo: true,
        },
      },
      persona: {
        select: {
          nombreCompleto: true, // ✅ Usa nombreCompleto
          correo: true,
          fotoUrl: true,
        },
      },
    },
    orderBy: {
      creadoEn: 'desc',
    },
    take: 5,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Actividad Reciente</h3>
      {recentTestimonials.length === 0 ? (
        <p className="text-muted-foreground">No hay actividad reciente</p>
      ) : (
        <ul className="space-y-3">
          {recentTestimonials.map((testimonio) => (
            <li key={testimonio.id} className="border-l-2 pl-4">
              <p className="font-medium">
                {testimonio.persona.nombreCompleto} {/* ✅ */}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonio.categoria.titulo}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(testimonio.creadoEn).toLocaleDateString('es-ES')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}