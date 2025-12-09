import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const testimonio = await prisma.testimonio.findUnique({
      where: { id },
      include: {
        persona: {
          select: {
            nombreCompleto: true,
            fotoUrl: true,
          },
        },
        medios: {
          select: {
            url: true,
            tipo: true,
          },
        },
        categoria: {
          select: {
            nombre: true,
          },
        },
      },
    });

    // Verificar que existe y está aprobado
    if (!testimonio || testimonio.estado !== "aprobado") {
      return NextResponse.json(
        { error: "Testimonio no encontrado" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    return NextResponse.json(sanitizeBigInt(testimonio), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error al obtener testimonio público:", error);
    return NextResponse.json(
      { error: "Error al obtener testimonio" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
