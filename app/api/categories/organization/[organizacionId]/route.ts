import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CategoryService } from "@/models/category/categoryService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const categoryService = new CategoryService();

/**
 * @openapi
 * /api/categories/organization/{organizacionId}:
 *   get:
 *     summary: Obtiene una categoría por el ID de la organización
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: organizacionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Categoría obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría u organización no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene categorías por el ID de la organización
export async function GET(request: NextRequest, { params }: { params: Promise<{ organizacionId: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { organizacionId } = await params;
        const organizationFounded = await prisma.organizacion.findUnique({ where: { id: organizacionId } });

        if (!organizationFounded) return NextResponse.json({ error: "No se encontró la organización" }, { status: 404 });

        const categories = await categoryService.getCategoryByOrganizacionId(organizacionId);

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};