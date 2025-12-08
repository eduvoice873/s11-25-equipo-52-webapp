import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

/**
 * Endpoint público para obtener categorías
 * No requiere autenticación
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizacionId = searchParams.get("organizacionId");

    const where: any = {};

    if (organizacionId) {
      where.organizacionId = organizacionId;
    }

    const categorias = await db.categoria.findMany({
      where,
      select: {
        id: true,
        nombre: true,
        organizacionId: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });

    // Headers CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    };

    return NextResponse.json({ categorias }, { headers });
  } catch (error) {
    console.error("Error al obtener categorías públicas:", error);
    return NextResponse.json(
      { error: "Error al cargar categorías" },
      { status: 500 }
    );
  }
}

// OPTIONS para CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
