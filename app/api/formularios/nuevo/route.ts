import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

/**
 * @openapi
 * /api/formularios/nuevo:
 *   post:
 *     summary: Crea un formulario
 *     tags:
 *       - Formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                   type: string
 *               descripcion:
 *                   type: string
 *               categoriaId:
 *                   type: string
 *               pedirNombre:
 *                   type: boolean
 *               pedirCorreo:
 *                   type: boolean
 *               permitirTexto:
 *                   type: boolean
 *               permitirTextoImagen:
 *                   type: boolean
 *               permitirVideo:
 *                   type: boolean
 *               mensajeGracias:
 *                   type: string
 *               slugPublico:
 *                   type: string
 *               preguntas:
 *                   type: array
 *             required:
 *               - titulo
 *               - descripcion
 *               - categoriaId
 *               - pedirNombre
 *               - pedirCorreo
 *               - permitirTexto
 *               - permitirTextoImagen
 *               - permitirVideo
 *               - mensajeGracias
 *               - slugPublico
 *               - preguntas
 *     responses:
 *       201:
 *         description: Formulario creado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
export async function POST(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, organizacionId: true },
    });

    if (!usuario || !usuario.organizacionId) {
      return NextResponse.json(
        { error: "Usuario u organización no encontrada" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      titulo, // ← VIENE DEL BUILDER
      descripcion,
      categoriaId,
      pedirNombre,
      pedirCorreo,
      permitirTexto,
      permitirTextoImagen,
      permitirVideo,
      mensajeGracias,
      slugPublico,
      preguntas, // ← [{ id, texto, tipo, requerida, opciones }]
    } = body;

    // Validaciones mínimas
    if (!titulo?.trim()) {
      return NextResponse.json(
        { error: "El título del formulario es requerido" },
        { status: 400 }
      );
    }

    // Si no hay slugPublico, generar uno basado en el título
    const slugFinal =
      slugPublico?.trim() ||
      titulo
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

    if (!categoriaId) {
      return NextResponse.json(
        { error: "La categoría es requerida" },
        { status: 400 }
      );
    }

    // Slug único
    const slugExistente = await prisma.formulario.findUnique({
      where: { slugPublico: slugFinal },
    });

    if (slugExistente) {
      return NextResponse.json(
        { error: "Este slug ya existe" },
        { status: 409 }
      );
    }

    // Verificar categoría
    const categoria = await prisma.categoria.findFirst({
      where: {
        id: categoriaId,
        organizacionId: usuario.organizacionId,
      },
    });

    if (!categoria) {
      return NextResponse.json(
        { error: "Categoría no encontrada o no pertenece a tu organización" },
        { status: 404 }
      );
    }

    // Crear formulario
    const formulario = await prisma.formulario.create({
      data: {
        nombreFormulario: titulo.trim(),
        descripcion: descripcion?.trim() || null,
        slugPublico: slugFinal,
        categoriaId,
        organizacionId: usuario.organizacionId,
        creadoPorId: usuario.id,

        pedirNombre: pedirNombre ?? true,
        pedirCorreo: pedirCorreo ?? true,
        permitirTexto: permitirTexto ?? true,
        permitirTextoImagen: permitirTextoImagen ?? false,
        permitirVideo: permitirVideo ?? false,

        mensajeGracias: mensajeGracias?.trim() || "¡Gracias por tu testimonio!",

        // Solo crear preguntas si existen y tienen datos válidos
        ...(preguntas &&
          Array.isArray(preguntas) &&
          preguntas.length > 0 && {
          preguntas: {
            create: preguntas
              .filter((p: any) => p?.texto?.trim()) // Filtrar preguntas vacías
              .map((p: any, index: number) => ({
                texto: p.texto.trim(),
                tipo: p.tipo || "texto",
                requerida: p.requerida ?? false,
                orden: index,
                opciones:
                  p.opciones &&
                    Array.isArray(p.opciones) &&
                    p.opciones.length > 0
                    ? JSON.stringify(p.opciones)
                    : null,
              })),
          },
        }),
      },
      include: {
        preguntas: true,
        categoria: true,
        creadoPor: true,
      },
    });

    return NextResponse.json({ success: true, formulario }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
