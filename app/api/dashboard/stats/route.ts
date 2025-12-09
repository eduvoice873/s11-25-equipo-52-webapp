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

    // ✅ Valida que organizacionId exista
    if (!organizacionId) {
      return NextResponse.json(
        { error: "organizacionId no encontrado" },
        { status: 400 }
      );
    }

    // Ahora TypeScript sabe que organizacionId es string
    const [
      videos,
      textos,
      testimonios,
      spaces,
      pending,
      approved,
      rejected,
      totalForms,
    ] = await Promise.all([
      // Videos
      prisma.medio.count({
        where: {
          tipo: "video",
          organizacionId,
        },
      }),

      // Testimonios de texto
      prisma.testimonio.count({
        where: {
          modalidad: "texto_imagen",
          categoria: { organizacionId },
        },
      }),

      // Total testimonios
      prisma.testimonio.count({
        where: {
          categoria: { organizacionId },
        },
      }),

      // Total categorías
      prisma.categoria.count({
        where: { organizacionId },
      }),

      // Pendientes (solo en_revision, borrador no se considera pendiente de moderación)
      prisma.testimonio.count({
        where: {
          categoria: { organizacionId },
          estado: "en_revision",
        },
      }),

      // Aprobados (aprobado + publicado)
      prisma.testimonio.count({
        where: {
          categoria: { organizacionId },
          estado: { in: ["aprobado", "publicado"] },
        },
      }),

      // Rechazados
      prisma.testimonio.count({
        where: {
          categoria: { organizacionId },
          estado: "rechazado",
        },
      }),

      // Total formularios
      prisma.formulario.count({
        where: { organizacionId },
      }),
    ]);

    const usage = Math.min(100, Math.round((spaces / 5) * 10));

    return NextResponse.json({
      // Stats originales
      videos,
      textos,
      testimonios,
      spaces,
      plan: "Free",
      usage,

      // Stats de moderación
      pending,
      approved,
      rejected,
      totalForms,

      // Stats adicionales
      totalTestimonials: testimonios,
      totalCategories: spaces,
    });
  } catch (error) {
    console.error("Stats error:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
