import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { OrganizationService } from "@/models/organization/organizationService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/organizations/user/{userId}:
 *   get:
 *     summary: Obtiene una organización por el ID del usuario
 *     tags:
 *       - Organización
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Organización obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Organización o usuario no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene una organización por el ID del usuario
export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { userId } = await params;
        const userFounded = await prisma.user.findUnique({ where: { id: userId } });

        if (!userFounded) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

        const organization = await organizationService.getOrganizationById(userFounded.organizacionId);

        return NextResponse.json(organization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};