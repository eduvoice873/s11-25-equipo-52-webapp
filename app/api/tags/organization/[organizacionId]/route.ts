import { NextRequest, NextResponse } from "next/server";
import { TagService } from "@/models/tag/tagService";
import { OrganizationService } from "@/models/organization/organizationService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const tagService = new TagService();
const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/tags/organization/{id}:
 *   get:
 *     summary: Obtiene una etiqueta por ID de la organización
 *     tags:
 *       - Etiqueta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Etiqueta obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Etiqueta u organización no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene etiquetas por el ID de la organización
export async function GET(request: NextRequest, { params }: { params: Promise<{ organizacionId: string }> }) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
    if (authCheck) return authCheck;

    try {
        const { organizacionId } = await params;

        const organizationFounded = await organizationService.getOrganizationById(organizacionId);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const tags = await tagService.getTagsByOrganizacionId(organizacionId);
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};