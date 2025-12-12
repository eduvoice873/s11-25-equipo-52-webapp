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
    const { action } = body;

    const testimonio = await prisma.testimonio.findUnique({
      where: { id },
    });

    if (!testimonio) {
      return NextResponse.json(
        { error: "Testimonio no encontrado" },
        { status: 404 }
      );
    }

    let updatedTestimonio;

    switch (action) {
      case "archive":
        updatedTestimonio = await prisma.testimonio.update({
          where: { id },
          data: {
            estado: "archivado",
            actualizadoPorId: session.user.id,
          },
        });

        await prisma.revision.create({
          data: {
            testimonioId: id,
            revisorId: session.user.id,
            decision: "rechazar",
            notas: "Testimonio archivado",
          },
        });

        return NextResponse.json({
          success: true,
          message: "Testimonio archivado",
          testimonio: updatedTestimonio,
        });

      case "spam":
        updatedTestimonio = await prisma.testimonio.update({
          where: { id },
          data: {
            estado: "rechazado",
            actualizadoPorId: session.user.id,
          },
        });

        await prisma.revision.create({
          data: {
            testimonioId: id,
            revisorId: session.user.id,
            decision: "rechazar",
            notas: "Marcado como spam",
          },
        });

        return NextResponse.json({
          success: true,
          message: "Marcado como spam",
          testimonio: updatedTestimonio,
        });

      case "toggle-featured":
        updatedTestimonio = await prisma.testimonio.update({
          where: { id },
          data: {
            destacado: !testimonio.destacado,
            actualizadoPorId: session.user.id,
          },
        });

        return NextResponse.json({
          success: true,
          message: testimonio.destacado
            ? "Removido de destacados"
            : "Marcado como destacado",
          testimonio: updatedTestimonio,
        });

      default:
        return NextResponse.json(
          { error: "Acción no válida" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error en acción de testimonio:", error);
    return NextResponse.json(
      { error: "Error al procesar acción" },
      { status: 500 }
    );
  }
}
