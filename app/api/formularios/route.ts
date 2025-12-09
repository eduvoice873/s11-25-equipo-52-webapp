import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET → Obtener todos los formularios (con conteo de respuestas)
export async function GET(request: NextRequest) {
  try {
    const formularios = await prisma.formulario.findMany({
      select: {
        id: true,
        nombreFormulario: true,
        descripcion: true,
        slugPublico: true,
        estado: true,
        pedirNombre: true,
        pedirCorreo: true,
        permitirTexto: true,
        permitirTextoImagen: true,
        permitirVideo: true,
        creadoEn: true,
        actualizadoEn: true,
        categoriaId: true,
        categoria: {
          select: {
            id: true,
            nombre: true,
            titulo: true,
          },
        },
        preguntas: {
          select: {
            id: true,
            texto: true,
            tipo: true,
            requerida: true,
            orden: true,
          },
          orderBy: { orden: "asc" },
        },
        _count: {
          select: {
            respuestas: true,
          },
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    // Mapear formularios con conteo de respuestas
    const formulariosConRespuestas = formularios.map((f) => ({
      ...f,
      respuestasTotales: f._count.respuestas,
      _count: undefined, // Remover _count del objeto final
    }));

    return NextResponse.json(
      {
        success: true,
        total: formularios.length,
        formularios: formulariosConRespuestas,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en GET /api/formularios:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
