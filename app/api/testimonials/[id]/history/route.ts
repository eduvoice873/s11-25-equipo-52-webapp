import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const revisiones = await prisma.revision.findMany({
      where: { testimonioId: id },
      include: {
        revisor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    const formattedRevisiones = revisiones.map((rev) => ({
      user: rev.revisor.name || rev.revisor.email || "Usuario desconocido",
      message:
        rev.decision === "aprobar"
          ? "aprobó el testimonio"
          : "rechazó el testimonio",
      notes: rev.notas,
      time: new Date(rev.creadoEn).toLocaleString("es-ES", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    }));

    return NextResponse.json(formattedRevisiones);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return NextResponse.json(
      { error: "Error al obtener historial" },
      { status: 500 }
    );
  }
}
