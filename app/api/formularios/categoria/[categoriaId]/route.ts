import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoriaId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { categoriaId } = await params;
    if (!categoriaId) {
      return NextResponse.json(
        { error: "categoriaId no proporcionado" },
        { status: 400 }
      );
    }

    // Obtener usuario
    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, organizacionId: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // 1️⃣ Asegurar que la categoría existe y pertenece a la organización
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

    // 2️⃣ Obtener formularios asociados a la categoría
    const formularios = await prisma.formulario.findMany({
      where: {
        categoriaId,
        organizacionId: usuario.organizacionId,
      },
      include: {
        preguntas: true,
        categoria: { select: { id: true, nombre: true } },
        creadoPor: { select: { id: true, name: true } },
        _count: { select: { respuestas: true } },
      },
      orderBy: { creadoEn: "desc" },
    });

    // 3️⃣ Transformar el formato de preguntas correctamente
    const formulariosConFormato = formularios.map((f) => ({
      ...f,
      preguntas: f.preguntas.map((p) => ({
        ...p,
        opciones: p.opciones ? JSON.parse(p.opciones) : [],
      })),
      respuestasTotales: f._count.respuestas,
      _count: undefined,
    }));

    return NextResponse.json(
      {
        success: true,
        categoriaId,
        total: formularios.length,
        formularios: formulariosConFormato,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "❌ Error en GET /api/formularios/categoria/[categoriaId]:",
      error
    );
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
