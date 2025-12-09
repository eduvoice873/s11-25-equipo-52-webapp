import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const forms = await prisma.formulario.findMany({
      select: {
        id: true,
        slugPublico: true,
        estado: true,
        nombreFormulario: true
      }
    });

    return NextResponse.json({ forms });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { error: "Error al obtener los formularios" },
      { status: 500 }
    );
  }
}