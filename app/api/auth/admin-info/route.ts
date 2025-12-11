import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Obtener el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        rol: true,
        organizacionId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    let adminEmail: string | null = null;

    if (user.rol === "editor") {
      // Si es editor, buscar un admin de la misma organización
      const admin = await prisma.user.findFirst({
        where: {
          organizacionId: user.organizacionId,
          rol: "admin",
        },
        select: { email: true },
      });
      adminEmail = admin?.email || null;
    } else {
      // Si es admin, buscar otro admin de la misma organización
      const admin = await prisma.user.findFirst({
        where: {
          organizacionId: user.organizacionId,
          rol: "admin",
          NOT: { id: user.id },
        },
        select: { email: true },
      });
      adminEmail = admin?.email || null;
    }

    return NextResponse.json({
      adminEmail,
    });
  } catch (error) {
    console.error("Error en admin-info:", error);
    return NextResponse.json(
      { error: "Error al obtener información del administrador" },
      { status: 500 }
    );
  }
}
