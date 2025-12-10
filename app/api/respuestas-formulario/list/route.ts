import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";
    const categoriaId = searchParams.get("categoriaId");
    const search = searchParams.get("search");

    const where: any = {
      formulario: {
        categoria: { organizacionId },
      },
    };

    console.log(" Filtro recibido:", filter);

    if (filter === "pending") {
      where.estado = "pendiente";
    } else if (filter === "approved") {
      where.estado = "aprobado";
    } else if (filter === "rejected") {
      where.estado = "rechazado";
    }

    console.log(" Condición WHERE:", JSON.stringify(where, null, 2));

    if (categoriaId && categoriaId !== "all") {
      where.formulario = {
        ...where.formulario,
        categoriaId,
      };
    }

    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { texto: { contains: search, mode: "insensitive" } },
        {
          nombreCompleto: { contains: search, mode: "insensitive" },
        },
      ];
    }

    const respuestas = await prisma.respuestaFormulario.findMany({
      where,
      include: {
        persona: {
          select: {
            nombreCompleto: true,
            correo: true,
            fotoUrl: true,
          },
        },
        formulario: {
          select: {
            nombreFormulario: true,
            categoria: {
              select: {
                nombre: true,
                titulo: true,
              },
            },
            preguntas: {
              select: {
                id: true,
                texto: true,
                tipo: true,
                orden: true,
              },
              orderBy: {
                orden: "asc",
              },
            },
          },
        },
        revisiones: {
          include: {
            revisor: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            creadoEn: "desc",
          },
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    // Para respuestas aprobadas, buscar el testimonio asociado
    const respuestasConTestimonio = await Promise.all(
      respuestas.map(async (respuesta) => {
        let testimonioId: string | null = null;
        let testimonio: any = null;

        if (respuesta.estado === "aprobado" && respuesta.personaId) {
          // Buscar el testimonio más reciente de esta persona
          // Usar personaId y texto como criterio (el titulo puede cambiar)
          testimonio = await prisma.testimonio.findFirst({
            where: {
              personaId: respuesta.personaId,
              texto: respuesta.texto,
            },
            include: {
              etiquetas: {
                select: {
                  id: true,
                  nombre: true,
                },
              },
            },
            orderBy: { creadoEn: "desc" },
          });

          if (testimonio) {
            testimonioId = testimonio.id;
          }
        }

        return {
          ...respuesta,
          testimonioId,
          testimonio: testimonio
            ? {
                etiquetas: testimonio.etiquetas.map((e: any) => e.nombre),
              }
            : null,
        };
      })
    );

    console.log(
      `📊 Total de respuestas encontradas: ${respuestasConTestimonio.length}`
    );
    console.log(
      "📋 Estados de las respuestas:",
      respuestasConTestimonio.map((r) => ({
        id: r.id,
        estado: r.estado,
        titulo: r.titulo,
      }))
    );

    return NextResponse.json(sanitizeBigInt(respuestasConTestimonio), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener respuestas de formulario:", error);
    return NextResponse.json(
      { error: "Error al obtener respuestas de formulario" },
      { status: 500 }
    );
  }
}
