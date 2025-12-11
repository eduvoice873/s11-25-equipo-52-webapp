import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

/**
 * GET /api/testimonials/moderacion
 * Obtener testimonios que el usuario actual puede moderar
 * - Admin: todos los testimonios de su organización
 * - Editor: solo los de sus categorías asignadas
 */
export async function GET(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const estado = searchParams.get("estado");
    const categoriaId = searchParams.get("categoriaId");

    const skip = (page - 1) * limit;

    // Obtener el usuario
    const usuario = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Solo admin puede ver testimonios para moderar
    if (usuario.rol !== "admin") {
      return NextResponse.json(
        { error: "Solo los admins pueden ver testimonios para moderar" },
        { status: 403 }
      );
    }

    // Construir el filtro
    const where: any = {
      categoria: {
        organizacionId: usuario.organizacionId,
      },
    };

    if (categoriaId) {
      where.categoriaId = categoriaId;
    }

    // Filtrar por estado si se especifica
    if (estado) {
      where.estado = estado;
    }

    // Obtener total para paginación
    const total = await prisma.testimonio.count({ where });

    // Obtener testimonios
    const testimonios = await prisma.testimonio.findMany({
      where,
      include: {
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
        persona: {
          select: {
            id: true,
            nombreCompleto: true,
            correo: true,
          },
        },
        revisiones: {
          take: 1,
          orderBy: { creadoEn: "desc" },
          include: {
            revisor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { creadoEn: "desc" },
      skip,
      take: limit,
    });

    const pages = Math.ceil(total / limit);

    return NextResponse.json({
      testimonios: testimonios.map((t) => ({
        id: t.id,
        titulo: t.titulo,
        estado: t.estado,
        categoriaId: t.categoriaId,
        categoriaNombre: t.categoria.nombre,
        personaNombre: t.persona.nombreCompleto,
        personaCorreo: t.persona.correo,
        calificacion: t.calificacion,
        creadoEn: t.creadoEn,
        ultimaRevision: t.revisiones[0],
      })),
      total,
      page,
      limit,
      pages,
    });
  } catch (error) {
    console.error("Error obteniendo testimonios para moderar:", error);
    return NextResponse.json(
      { error: "Error al obtener testimonios" },
      { status: 500 }
    );
  }
}
