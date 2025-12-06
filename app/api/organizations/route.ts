import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OrganizationService } from "@/models/organization/organizationService";
import { OrganizationCreateSchema } from "@/models/organization/dto/organization";

const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/organizations:
 *   post:
 *     summary: Crea una organización
 *     tags:
 *       - Organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                   type: string
 *               slug:
 *                   type: string
 *             required:
 *               - nombre
 *               - slug
 *     responses:
 *       201:
 *         description: Organización creada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Crea una nueva organización
export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = OrganizationCreateSchema.parse(body);
        const newOrganization = await organizationService.createOrganization(dto);

        return NextResponse.json(newOrganization, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/organizations:
 *   get:
 *     summary: Obtiene todas las organizaciones
 *     tags:
 *       - Organización
 *     responses:
 *       200:
 *         description: Organizaciones obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationCreateSchema'
 */
// Obtiene todas las organizaciones
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const organizations = await organizationService.getAllOrganizations();
    return NextResponse.json(organizations, { status: 200 });
};