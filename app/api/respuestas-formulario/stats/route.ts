import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const organizacionId = session.user.organizacionId;
    if (!organizacionId) {
      return NextResponse.json(
        { error: "No se encontró ID de organización" },
        { status: 400 }
      );
    }

    const whereClause = {
      formulario: {
        categoria: { organizacionId },
      },
    };

    const [total, pendientes, aprobados, rechazados] = await Promise.all([
      prisma.respuestaFormulario.count({ where: whereClause }),
      prisma.respuestaFormulario.count({
        where: { ...whereClause, estado: "pendiente" },
      }),
      prisma.respuestaFormulario.count({
        where: { ...whereClause, estado: "aprobado" },
      }),
      prisma.respuestaFormulario.count({
        where: { ...whereClause, estado: "rechazado" },
      }),
    ]);

    return NextResponse.json({
      total,
      pendientes,
      aprobados,
      rechazados,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
