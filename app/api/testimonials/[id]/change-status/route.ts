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
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { estado } = body;

    if (!estado || !["pendiente", "aprobado", "rechazado"].includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    console.log(` Cambiando estado de ${id} a ${estado}`);

    // Actualizar estado en RespuestaFormulario
    const respuesta = await prisma.respuestaFormulario.update({
      where: { id },
      data: { estado },
    });

    // Guardar revisión del cambio de estado
    await prisma.revisionRespuestaFormulario.create({
      data: {
        respuestaFormularioId: id,
        revisorId: session.user.id,
        decision: estado,
        notas: `Estado cambiado a ${estado}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Estado cambiado a ${estado}`,
        respuesta,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    return NextResponse.json(
      { error: "Error al cambiar estado" },
      { status: 500 }
    );
  }
}
