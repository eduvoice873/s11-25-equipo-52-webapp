import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

/**
 * @openapi
 * /api/formulario/{slug}:
 *   get:
 *     summary: Obtiene una organización por el nombre de la organización
 *     tags:
 *       - Formulario
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la organización
 *     responses:
 *       200:
 *         description: Formulario obtenido
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Formulario u organización no encontrado
 *       500:
 *         description: Error interno
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> } // ← Next.js 15+ params es una Promise
) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    // Esperar la Promise de params
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug no proporcionado" },
        { status: 400 }
      );
    }

    // Obtener formulario público
    const formulario = await prisma.formulario.findUnique({
      where: {
        slugPublico: slug.trim(), // Trimear por si tiene espacios
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

    if (!formulario) {
      // Buscar si existe con otro formato
      const formularios = await prisma.formulario.findMany({
        where: {
          slugPublico: {
            contains: slug,
            mode: "insensitive",
          },
        },
        select: { slugPublico: true },
      });

      return NextResponse.json(
        {
          error: "Formulario no encontrado",
          slugBuscado: slug,
          formulariosSimilares: formularios,
        },
        { status: 404 }
      );
    }

    if (!formulario.estado) {
      return NextResponse.json(
        { error: "Este formulario no está disponible" },
        { status: 403 }
      );
    }

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
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
