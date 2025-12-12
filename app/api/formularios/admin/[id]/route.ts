// app/api/formularios/admin/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

/**
 * @openapi
 * /api/formularios/admin/{id}:
 *   delete:
 *     summary: Elimina un formulario por el ID del administrador
 *     tags:
 *       - Formulario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del administrador
 *     responses:
 *       204:
 *         description: Formulario eliminado
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Formulario no encontrado
 *       500:
 *          description: Error interno
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    // Verificar autenticación
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
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

    const { id } = await params;

    // Verificar que el formulario pertenece al usuario/organización
    const formulario = await prisma.formulario.findFirst({
      where: {
        id,
        organizacionId: usuario.organizacionId,
      },
    });

    if (!formulario) {
      return NextResponse.json(
        { error: "Formulario no encontrado o no pertenece a tu organización" },
        { status: 404 }
      );
    }

    // Eliminar formulario (cascada elimina preguntas y respuestas)
    await prisma.formulario.delete({
      where: { id },
    });



    return NextResponse.json(
      {
        success: true,
        message: "Formulario eliminado exitosamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(" Error en DELETE /api/formularios/admin/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * @openapi
 * /api/formularios/admin/{id}:
 *   get:
 *     summary: Obtiene un formulario por el ID del administrador
 *     tags:
 *       - Formulario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del administrador
 *     responses:
 *       204:
 *         description: Formulario obtenido
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Formulario no encontrado
 *       500:
 *          description: Error interno
 */
// También puedo agregar GET para obtener un formulario específico
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { organizacionId: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const { id } = await params;

    // Validar que pertenece a la organización
    const formulario = await prisma.formulario.findFirst({
      where: {
        id,
        organizacionId: usuario.organizacionId,
      },
      include: {
        preguntas: { orderBy: { orden: "asc" } },
        categoria: true,
        creadoPor: true,
        _count: { select: { respuestas: true } },
      },
    });

    if (!formulario) {
      return NextResponse.json(
        { error: "Formulario no encontrado o no pertenece a tu organización" },
        { status: 404 }
      );
    }

    // Convertir opciones de JSON a array
    const preguntas = formulario.preguntas.map((p) => ({
      ...p,
      opciones: p.opciones ? JSON.parse(p.opciones) : [],
    }));

    return NextResponse.json(
      {
        success: true,
        formulario: {
          ...formulario,
          preguntas,
          respuestasTotales: formulario._count.respuestas,
          _count: undefined,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(" Error en GET /api/formularios/admin/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * @openapi
 * /api/formularios/admin/{id}:
 *   patch:
 *     summary: Actualiza parcialmente un formulario por el ID del administrador
 *     tags:
 *       - Formulario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del administrador
 *     responses:
 *       204:
 *         description: Formulario actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Formulario no encontrado
 *       500:
 *          description: Error interno
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { organizacionId: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const {
      titulo,
      descripcion,
      pedirNombre,
      pedirCorreo,
      permitirTexto,
      permitirTextoImagen,
      permitirVideo,
      mensajeGracias,
      slugPublico,
      estado,
      preguntas, // array completo desde el builder
    } = body;

    // 1️⃣ Verificar que el formulario existe y pertenece a la organización
    const formularioExistente = await prisma.formulario.findFirst({
      where: { id, organizacionId: usuario.organizacionId },
    });

    if (!formularioExistente) {
      return NextResponse.json(
        { error: "Formulario no encontrado o no pertenece a tu organización" },
        { status: 404 }
      );
    }

    // 2️⃣ Validar slug único (si fue modificado)
    if (slugPublico && slugPublico !== formularioExistente.slugPublico) {
      const slugOcupado = await prisma.formulario.findUnique({
        where: { slugPublico },
      });

      if (slugOcupado) {
        return NextResponse.json(
          { error: "Este slug ya está en uso" },
          { status: 409 }
        );
      }
    }

    // 3️⃣ Actualizar el formulario principal
    await prisma.formulario.update({
      where: { id },
      data: {
        nombreFormulario: titulo,
        descripcion,
        pedirNombre,
        pedirCorreo,
        permitirTexto,
        permitirTextoImagen,
        permitirVideo,
        mensajeGracias,
        slugPublico,
        estado: estado,
      },
    });

    // 4️⃣ Eliminar TODAS las preguntas anteriores
    await prisma.preguntaFormulario.deleteMany({
      where: { formularioId: id },
    });

    // 5️⃣ Crear nuevas preguntas según el orden actual del builder
    if (preguntas && preguntas.length > 0) {
      await prisma.preguntaFormulario.createMany({
        data: preguntas.map((p: any, index: number) => ({
          formularioId: id,
          texto: p.texto.trim(),
          tipo: p.tipo,
          requerida: p.requerida ?? false,
          orden: index,
          opciones:
            p.opciones && Array.isArray(p.opciones) && p.opciones.length > 0
              ? JSON.stringify(p.opciones)
              : null,
        })),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Formulario actualizado correctamente",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(" Error en PATCH /api/formularios/admin/[id]:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Error interno del servidor al actualizar el formulario",
      },
      { status: 500 }
    );
  }
}
