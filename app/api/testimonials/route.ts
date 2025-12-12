import { NextRequest, NextResponse } from "next/server";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { OrganizationService } from "@/models/organization/organizationService";
import { TestimonialFullService } from "@/models/testimonialFull/testimonialFullService";
import { TestimonialFullCreateSchema } from "@/models/testimonialFull/dto/testimonialFull";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const testimonialService = new TestimonialService();
const organizationService = new OrganizationService();
const testimonialFullService = new TestimonialFullService();

/**
 * @openapi
 * /api/testimonials:
 *   post:
 *     summary: Crea un testimonio con persona incluida
 *     tags:
 *       - Testimonios
 */
// Crea un nuevo testimonio
export async function POST(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    const body = await request.json();
    const dto = TestimonialFullCreateSchema.parse(body);

    const organizacionId =
      await organizationService.getOrganizationIdByCategoryId(
        dto.testimonial.categoriaId
      );
    if (!organizacionId)
      return NextResponse.json(
        { error: "Organization not found for user" },
        { status: 404 }
      );

    const newTestimonial = await testimonialFullService.createTestimonialFull(
      dto,
      organizacionId
    );

    return NextResponse.json(sanitizeBigInt(newTestimonial), { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @openapi
 * /api/testimonials:
 *   get:
 *     summary: Obtiene todos los testimonios con filtros
 *     tags:
 *       - Testimonios
 */
// Obtiene todos los testimonios
export async function GET(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    // Verificar autenticación
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Obtener organizacionId
    const organizacionId = session.user.organizacionId;
    if (!organizacionId) {
      return NextResponse.json(
        { error: "No organization ID found" },
        { status: 400 }
      );
    }

    // Obtener parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";
    const categoriaId = searchParams.get("categoriaId");
    const search = searchParams.get("search");

    // Construir filtros
    const where: any = {
      categoria: { organizacionId },
    };

    // Filtrar por estado
    if (filter === "pending") {
      where.estado = { in: ["borrador", "en_revision"] };
    } else if (filter === "approved") {
      where.estado = { in: ["aprobado", "publicado"] };
    } else if (filter === "rejected") {
      where.estado = "rechazado";
    }

    // Filtrar por categoría
    if (categoriaId && categoriaId !== "all") {
      where.categoriaId = categoriaId;
    }

    // Filtrar por búsqueda de texto
    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { texto: { contains: search, mode: "insensitive" } },
        {
          persona: {
            nombreCompleto: { contains: search, mode: "insensitive" },
          },
        },
      ];
    }

    // Obtener testimonios
    const testimonials = await prisma.testimonio.findMany({
      where,
      include: {
        persona: {
          select: {
            nombreCompleto: true,
            correo: true,
            fotoUrl: true,
          },
        },
        categoria: {
          select: {
            nombre: true,
            titulo: true,
          },
        },
        medios: {
          select: {
            id: true,
            url: true,
            tipo: true,
            leyenda: true,
          },
        },
        revisiones: {
          include: {
            revisor: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { creadoEn: "desc" },
          take: 1,
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    return NextResponse.json(sanitizeBigInt(testimonials), { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
