import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const body = await request.json();
    const { decision, notas } = body;

    if (decision !== "aprobar" && decision !== "rechazar") {
      return NextResponse.json({ error: "Decisión inválida" }, { status: 400 });
    }

    const respuestaFormulario = await prisma.respuestaFormulario.findUnique({
      where: { id },
      include: {
        formulario: {
          include: {
            categoria: true,
          },
        },
        persona: true,
      },
    });

    if (!respuestaFormulario) {
      return NextResponse.json(
        { error: "Respuesta de formulario no encontrada" },
        { status: 404 }
      );
    }

    // Verificar que el usuario sea admin
    const usuario = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (usuario.rol !== "admin") {
      return NextResponse.json(
        { error: "Solo los admins pueden moderar testimonios" },
        { status: 403 }
      );
    }

    if (decision === "aprobar") {
      const modalidad = respuestaFormulario.videoUrl ? "video" : "texto_imagen";

      // Asegurar que existe una Persona
      let personaId = respuestaFormulario.personaId;

      // Debug: ver qué datos tenemos
      console.log("RespuestaFormulario:", {
        id: respuestaFormulario.id,
        personaId: respuestaFormulario.personaId,
        correo: respuestaFormulario.correo,
        nombreCompleto: respuestaFormulario.nombreCompleto,
        persona: respuestaFormulario.persona
          ? {
            id: respuestaFormulario.persona.id,
            correo: respuestaFormulario.persona.correo,
            nombreCompleto: respuestaFormulario.persona.nombreCompleto,
          }
          : null,
      });

      if (!personaId) {
        // Si no hay personaId, crear o buscar la persona por correo
        let correo =
          respuestaFormulario.correo || respuestaFormulario.persona?.correo;
        const nombreCompleto =
          respuestaFormulario.nombreCompleto ||
          respuestaFormulario.persona?.nombreCompleto ||
          "Anónimo";

        // Si no hay correo, generar uno temporal basado en el ID de la respuesta
        if (!correo) {
          correo = `testimonio-${respuestaFormulario.id}@voiceshub.temp`;
          console.log(" Correo no encontrado, generando temporal:", correo);
        }

        console.log(" Creando/actualizando persona con:", {
          correo,
          nombreCompleto,
        });

        // Buscar o crear la persona
        const persona = await prisma.persona.upsert({
          where: { correo },
          update: {
            nombreCompleto,
          },
          create: {
            correo,
            nombreCompleto,
          },
        });

        personaId = persona.id;

        // Actualizar la respuesta con el personaId
        await prisma.respuestaFormulario.update({
          where: { id },
          data: { personaId },
        });
      } else if (!respuestaFormulario.persona) {
        // Si tiene personaId pero no se cargó la relación, obtenerla
        const persona = await prisma.persona.findUnique({
          where: { id: personaId },
        });

        if (!persona) {
          return NextResponse.json(
            { error: "No se encontró la persona asociada" },
            { status: 400 }
          );
        }
      }

      const nuevoTestimonio = await prisma.testimonio.create({
        data: {
          personaId: personaId,
          categoriaId: respuestaFormulario.formulario.categoriaId,
          titulo: respuestaFormulario.titulo,
          texto: respuestaFormulario.texto,
          calificacion: respuestaFormulario.calificacion,
          estado: "aprobado",
          modalidad,
          actualizadoPorId: session.user.id,
        },
      });

      if (respuestaFormulario.imagenUrl) {
        await prisma.medio.create({
          data: {
            organizacionId:
              respuestaFormulario.formulario.categoria.organizacionId,
            testimonioId: nuevoTestimonio.id,
            tipo: "imagen",
            url: respuestaFormulario.imagenUrl,
            ancho: 0,
            alto: 0,
          },
        });
      }

      if (respuestaFormulario.videoUrl) {
        await prisma.medio.create({
          data: {
            organizacionId:
              respuestaFormulario.formulario.categoria.organizacionId,
            testimonioId: nuevoTestimonio.id,
            tipo: "video",
            url: respuestaFormulario.videoUrl,
            ancho: 0,
            alto: 0,
          },
        });
      }

      await prisma.respuestaFormulario.update({
        where: { id },
        data: {
          estado: "aprobado",
        },
      });

      await prisma.revision.create({
        data: {
          testimonioId: nuevoTestimonio.id,
          revisorId: session.user.id,
          decision: "aprobar",
          notas:
            notas ||
            `Testimonio aprobado y convertido desde respuesta de formulario ${id}`,
        },
      });

      const testimonioCompleto = await prisma.testimonio.findUnique({
        where: { id: nuevoTestimonio.id },
        include: {
          persona: true,
          categoria: true,
          medios: true,
          revisiones: {
            include: {
              revisor: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: { creadoEn: "desc" },
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Testimonio aprobado y convertido exitosamente",
        testimonio: testimonioCompleto,
      });
    } else if (decision === "rechazar") {
      await prisma.respuestaFormulario.update({
        where: { id },
        data: {
          estado: "rechazado",
        },
      });

      // Guardar revisión
      await prisma.revisionRespuestaFormulario.create({
        data: {
          respuestaFormularioId: id,
          revisorId: session.user.id,
          decision: "rechazar",
          notas: notas || "Testimonio rechazado",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Testimonio rechazado",
        respuestaFormulario: {
          id: respuestaFormulario.id,
          estado: "rechazado",
        },
      });
    }
  } catch (error) {
    console.error("Error al moderar testimonio:", error);
    return NextResponse.json(
      { error: "Error al moderar testimonio" },
      { status: 500 }
    );
  }
}
