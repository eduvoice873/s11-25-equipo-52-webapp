import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

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
    const { titulo, texto, calificacion, nombre, correo, etiquetas } = body;
    // Validamos los datos recibidos
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
      include: {
        persona: true,
        categoria: true,
      },
    });

    if (!testimonioExistente) {
      return NextResponse.json(
        { error: "Testimonio no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar Persona si se proporciona nombre o correo
    if (nombre || correo) {
      await prisma.persona.update({
        where: { id: testimonioExistente.personaId },
        data: {
          nombreCompleto: nombre || undefined,
          correo: correo || undefined,
        },
      });
    }

    // Manejo de etiquetas
    let etiquetasConnect: { id: string }[] = [];
    if (Array.isArray(etiquetas)) {
      const organizacionId = testimonioExistente.categoria.organizacionId;

      for (const nombreEtiqueta of etiquetas) {
        if (typeof nombreEtiqueta === "string" && nombreEtiqueta.trim()) {
          const nombreClean = nombreEtiqueta.trim();

          // Buscar si ya existe la etiqueta en la organización
          let etiqueta = await prisma.etiqueta.findFirst({
            where: {
              organizacionId,
              nombre: { equals: nombreClean, mode: "insensitive" },
            },
          });

          // Si no existe, crearla
          if (!etiqueta) {
            etiqueta = await prisma.etiqueta.create({
              data: {
                nombre: nombreClean,
                organizacionId,
              },
            });
          }

          etiquetasConnect.push({ id: etiqueta.id });
        }
      }
    }

    // Actualizar el testimonio
    const testimonioActualizado = await prisma.testimonio.update({
      where: { id },
      data: {
        titulo: titulo?.trim() || "",
        texto: texto.trim(),
        calificacion: calificacion || testimonioExistente.calificacion,
        actualizadoPorId: session.user.id,
        actualizadoEn: new Date(),
        publicadoEn: new Date(),
        // Asegurarse de que siga siendo aprobado/publicado
        estado:
          testimonioExistente.estado === "aprobado" ||
            testimonioExistente.estado === "publicado"
            ? testimonioExistente.estado
            : "aprobado",
        etiquetas:
          Array.isArray(etiquetas) && etiquetas.length > 0
            ? {
              set: etiquetasConnect,
            }
            : {
              set: [],
            },
      },
      include: {
        persona: true,
        categoria: true,
        medios: true,
        etiquetas: true,
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
