import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { CategoryService } from "@/models/category/categoryService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const categoryService = new CategoryService();

/**
 * @openapi
 * /api/categories/user/{userId}:
 *   get:
 *     summary: Obtiene una categoría por el ID del usuario
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Categoría obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría o usuario no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene categorías por el ID del creador
export async function GET(request: NextRequest, { params }: { params: Promise<{ creadoPorId: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { creadoPorId } = await params;
        const userFounded = await prisma.user.findUnique({ where: { id: creadoPorId } });

        if (!userFounded) return NextResponse.json({ error: "No se encontró el usuario" }, { status: 404 });

        const categories = await categoryService.getCategoryByCreadoPorId(creadoPorId);
        if (!categories) return NextResponse.json({ error: "No se encontró la categoría" }, { status: 404 });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};