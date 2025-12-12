import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

/**
 * @openapi
 * /api/respuestas-formulario:
 *   get:
 *     summary: Obtiene todas las respuestas de un formulario por medio de un filtrado
 *     tags:
 *       - Respuesta Formulario
 *     parameters:
 *       - in: query
 *         name: formularioUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Url del formulario para filtrar las respuestas
 *     responses:
 *       '200':
 *         description: Respuestas de formularios obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       formularioId:
 *                         type: string
 *                       personaId:
 *                         type: string
 *                         nullable: true
 *                       nombreCompleto:
 *                         type: string
 *                         nullable: true
 *                       correo:
 *                         type: string
 *                         nullable: true
 *                       titulo:
 *                         type: string
 *                       texto:
 *                         type: string
 *                       calificacion:
 *                         type: integer
 *                         example: 5
 *                       estado:
 *                         type: string
 *                         example: pendiente
 *                       imagenUrl:
 *                         type: string
 *                         nullable: true
 *                       videoUrl:
 *                         type: string
 *                         nullable: true
 *                       creadoEn:
 *                         type: string
 *                         format: date-time
 *                       persona:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           nombreCompleto:
 *                             type: string
 *                           correo:
 *                             type: string
 *                           fotoUrl:
 *                             type: string
 *                             nullable: true
 *       '400':
 *         description: Parámetros inválidos (p. ej., falta formularioUrl)
 *       '500':
 *         description: Error interno del servidor
 */
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

    // Si el usuario es editor, obtener su categoría asignada
    let editorCategoriaId: string | null = null;
    if (session.user.rol === "editor") {
      const editorCategory = await prisma.categoria.findFirst({
        where: { creadoPorId: session.user.id },
        select: { id: true },
      });
      editorCategoriaId = editorCategory?.id || null;
    }

    const where: any = {
      formulario: {
        categoria: { organizacionId },
      },
    };

    

    if (filter === "pending") {
      where.estado = "pendiente";
    } else if (filter === "approved") {
      where.estado = "aprobado";
    } else if (filter === "rejected") {
      where.estado = "rechazado";
    }



    // Si es editor, filtrar por su categoría
    if (session.user.rol === "editor" && editorCategoriaId) {
      where.formulario = {
        ...where.formulario,
        categoriaId: editorCategoriaId,
      };
    } else if (categoriaId && categoriaId !== "all") {
      // Si es admin, permitir filtrar por categoriaId específico
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
