import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { titulo, texto, calificacion } = body;

    // Validar que el texto no esté vacío
    if (!texto || typeof texto !== "string" || !texto.trim()) {
      return NextResponse.json(
        { error: "El texto del testimonio es obligatorio" },
        { status: 400 }
      );
    }

    // Validar calificación
    if (calificacion !== undefined && (calificacion < 1 || calificacion > 5)) {
      return NextResponse.json(
        { error: "La calificación debe estar entre 1 y 5" },
        { status: 400 }
      );
    }

    // Verificar que el testimonio existe
    const testimonioExistente = await prisma.testimonio.findUnique({
      where: { id },
    });

    if (!testimonioExistente) {
      return NextResponse.json(
        { error: "Testimonio no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el testimonio
    const testimonioActualizado = await prisma.testimonio.update({
      where: { id },
      data: {
        titulo: titulo?.trim() || null,
        texto: texto.trim(),
        calificacion: calificacion || testimonioExistente.calificacion,
        actualizadoPorId: session.user.id,
        actualizadoEn: new Date(),
      },
      include: {
        persona: true,
        categoria: true,
        medios: true,
      },
    });

    // Crear registro de revisión
    if (session.user.id) {
      await prisma.revision.create({
        data: {
          testimonioId: id,
          revisorId: session.user.id,
          decision: "editar",
          notas: "Testimonio editado por moderador",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonio actualizado exitosamente",
      testimonio: testimonioActualizado,
    });
  } catch (error) {
    console.error("Error al editar testimonio:", error);
    return NextResponse.json(
      { error: "Error al editar testimonio" },
      { status: 500 }
    );
  }
}
