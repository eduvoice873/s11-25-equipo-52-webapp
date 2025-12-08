import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Persona } from "@/app/generated/prisma/client";

// ======================================================
// POST → Crear una respuesta de formulario (testimonio)
// ======================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      formularioId,
      slugPublico,
      nombreCompleto,
      correo,
      titulo,
      texto,
      calificacion,
      organizacionId,
    } = body;

    console.log(" Body recibido:", {
      formularioId,
      slugPublico,
      nombreCompleto,
      correo,
      titulo,
      organizacionId,
      respuestas: body.respuestas,
    });

    // Validación básica
    if (!formularioId && !slugPublico) {
      return NextResponse.json(
        { error: "Formulario no especificado" },
        { status: 400 }
      );
    }

    // Ya no requerir título ni texto obligatoriamente
    // El título tiene valor por defecto y el texto puede ser null si hay preguntas
    // La validación real la hace el frontend según la configuración del formulario

    // Obtener formulario
    let formulario;
    if (slugPublico) {
      console.log(" Buscando formulario por slug:", slugPublico);
      formulario = await prisma.formulario.findUnique({
        where: { slugPublico },
        select: {
          id: true,
          categoriaId: true,
          estado: true,
          organizacionId: true,
        },
      });
    } else {
      console.log(" Buscando formulario por ID:", formularioId);
      formulario = await prisma.formulario.findUnique({
        where: { id: formularioId },
        select: {
          id: true,
          categoriaId: true,
          estado: true,
          organizacionId: true,
        },
      });
    }

    console.log(" Formulario encontrado:", formulario?.id);

    if (!formulario) {
      console.error(" Formulario no encontrado");
      return NextResponse.json(
        { error: "Formulario no encontrado" },
        { status: 404 }
      );
    }

    console.log(" Estado del formulario:", formulario.estado);

    if (formulario.estado !== "publicado") {
      console.warn(" Formulario no publicado:", formulario.estado);
      return NextResponse.json(
        { error: "Este formulario no está disponible actualmente" },
        { status: 403 }
      );
    }

    // Buscar o crear persona
    let persona: Persona | null = null;

    if (correo?.trim()) {
      console.log(" Buscando persona por email:", correo);

      persona = await prisma.persona.findUnique({
        where: { correo: correo.trim() },
      });

      if (!persona) {
        console.log(" Creando nueva persona:", correo);

        persona = await prisma.persona.create({
          data: {
            nombreCompleto: nombreCompleto?.trim() || "Anónimo",
            correo: correo.trim(),
          },
        });

        console.log(" Persona creada:", persona.id);
      } else {
        console.log(" Persona existente encontrada:", persona.id);
      }
    } else {
      console.log(" Sin correo proporcionado, creando respuesta anónima");
    }

    // Guardar respuesta
    console.log(" Guardando respuesta...");
    const respuesta = await prisma.respuestaFormulario.create({
      data: {
        formularioId: formulario.id,
        personaId: persona?.id || null,
        nombreCompleto: nombreCompleto?.trim() || null,
        correo: correo?.trim() || null,
        titulo: titulo?.trim() || "Testimonio sin título",
        texto: texto?.trim() || null,
        calificacion: calificacion || 5,
        estado: "pendiente",
        imagenUrl: body.imagenUrl || null,
        videoUrl: body.videoUrl || null,
        imagenPublicId: body.imagenPublicId || null,
        videoPublicId: body.videoPublicId || null,
        respuestasPreguntas: body.respuestas || null,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nombreFormulario: true,
            categoriaId: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        persona: {
          select: {
            id: true,
            nombreCompleto: true,
            correo: true,
            fotoUrl: true,
          },
        },
      },
    });

    console.log(" Respuesta guardada:", respuesta.id);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonio enviado exitosamente",
        respuesta,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error en POST /api/respuestas-formulario:", error);
    const errorMsg =
      error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      { error: `Error interno del servidor: ${errorMsg}` },
      { status: 500 }
    );
  }
}

// ======================================================
// GET → Obtener todas las respuestas de un formulario
// ======================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const formularioId = searchParams.get("formularioId");

    if (!formularioId) {
      return NextResponse.json(
        { error: "formularioId requerido" },
        { status: 400 }
      );
    }

    // Obtener respuestas
    const respuestas = await prisma.respuestaFormulario.findMany({
      where: { formularioId },
      include: {
        persona: {
          select: {
            id: true,
            nombreCompleto: true,
            correo: true,
            fotoUrl: true,
          },
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        total: respuestas.length,
        respuestas,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en GET /api/respuestas-formulario:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
