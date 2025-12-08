import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoriaId = searchParams.get("categoriaId");
    const organizacionId = searchParams.get("organizacionId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const destacados = searchParams.get("destacados") === "true";

    if (!categoriaId && !organizacionId) {
      return NextResponse.json([], {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const where: any = {
      estado: { in: ["aprobado", "publicado"] },
    };

    if (destacados) {
      where.destacado = true;
    }

    if (categoriaId) {
      where.categoriaId = categoriaId;
    } else if (organizacionId) {
      where.categoria = { organizacionId };
    }

    const testimonios = await prisma.testimonio.findMany({
      where,
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
          orderBy: {
            creadoEn: "asc",
          },
        },
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: [{ destacado: "desc" }, { publicadoEn: "desc" }],
      take: limit,
    });

    // Transformar datos al formato esperado por el widget
    const testimoniosTransformados = testimonios.map((t) => ({
      id: t.id,
      titulo: t.titulo,
      texto: t.texto,
      calificacion: t.calificacion,
      destacado: t.destacado,
      fecha: t.creadoEn.toISOString(),
      autor: {
        nombre: t.persona?.nombreCompleto || "Anónimo",
        cargo: "",
        avatar:
          t.persona?.fotoUrl ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(t.persona?.nombreCompleto || "Anónimo") +
            "&background=random",
      },
      medios: t.medios.map((m) => ({
        tipo: m.tipo,
        url: m.url,
      })),
      categoria: t.categoria
        ? {
            id: t.categoria.id,
            nombre: t.categoria.nombre,
          }
        : null,
    }));

    return NextResponse.json(testimoniosTransformados, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error al obtener testimonios públicos:", error);
    return NextResponse.json(
      {
        error: "Error al obtener testimonios",
        details: error instanceof Error ? error.message : "Unknown error",
      },
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
