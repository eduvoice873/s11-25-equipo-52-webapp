import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    // Verificar que la respuesta existe
    const respuesta = await prisma.respuestaFormulario.findUnique({
      where: { id },
      include: {
        formulario: {
          include: {
            categoria: true,
          },
        },
      },
    });

    if (!respuesta) {
      return NextResponse.json(
        { error: "Respuesta no encontrada" },
        { status: 404 }
      );
    }

    // Verificar permisos: solo admins o el propietario de la organización
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const isAdmin = user.rol === "admin";
    const isOwner =
      user.organizacionId === respuesta.formulario.categoria.organizacionId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: "No tienes permisos para eliminar esta respuesta" },
        { status: 403 }
      );
    }

    // Eliminar la respuesta
    await prisma.respuestaFormulario.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Respuesta eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar respuesta:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al eliminar la respuesta",
      },
      { status: 500 }
    );
  }
}
