import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> } // ← Next.js 15+ params es una Promise
) {
  try {
    // Esperar la Promise de params
    const { slug } = await context.params;

    console.log(" Slug recibido en API:", slug);

    if (!slug) {
      console.log(" Slug vacío");
      return NextResponse.json(
        { error: "Slug no proporcionado" },
        { status: 400 }
      );
    }

    console.log(" Buscando formulario con slug:", slug);

    // Obtener formulario público
    const formulario = await prisma.formulario.findUnique({
      where: {
        slugPublico: slug.trim() // Trimear por si tiene espacios
      },
      select: {
        id: true,
        nombreFormulario: true,
        descripcion: true,
        pedirNombre: true,
        pedirCorreo: true,
        permitirTexto: true,
        permitirTextoImagen: true,
        permitirVideo: true,
        mensajeGracias: true,
        estado: true,
        preguntas: {
          select: {
            id: true,
            texto: true,
            tipo: true,
            requerida: true,
            orden: true,
            opciones: true,
          },
          orderBy: { orden: "asc" },
        },
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    console.log(" Resultado de búsqueda:", formulario ? " Encontrado" : " No encontrado");

    if (!formulario) {
      // Buscar si existe con otro formato
      const formularios = await prisma.formulario.findMany({
        where: {
          slugPublico: {
            contains: slug,
            mode: 'insensitive',
          },
        },
        select: { slugPublico: true },
      });

      console.log(" Formularios similares:", formularios);

      return NextResponse.json(
        {
          error: "Formulario no encontrado",
          slugBuscado: slug,
          formulariosSimilares: formularios
        },
        { status: 404 }
      );
    }

    if (!formulario.estado) {
      console.log(" Formulario inactivo");
      return NextResponse.json(
        { error: "Este formulario no está disponible" },
        { status: 403 }
      );
    }

    console.log(" Formulario encontrado y activo:", formulario.id);

    return NextResponse.json(
      {
        success: true,
        formulario: {
          ...formulario,
          preguntas: formulario.preguntas.map((p) => ({
            ...p,
            opciones: p.opciones ? JSON.parse(p.opciones) : [],
          })),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en GET /api/formularios/[slug]:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}