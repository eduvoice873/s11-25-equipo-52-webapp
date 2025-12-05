import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OrganizationService } from "@/models/organization/organizationService";
import { OrganizationUpdateSchema } from "@/models/organization/dto/organization";

const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/organizations/{id}:
 *   get:
 *     summary: Obtiene una organización por su ID
 *     tags:
 *       - Organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
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
 *         description: Organización no encontrada
 *       500:
 *         description: Error interno
 */
//Obtiene una organización por su ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organization = await organizationService.getOrganizationById(id);
        if (!organization) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        return NextResponse.json(organization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/organizations/{id}:
 *   put:
 *     summary: Actualiza una organización por su ID
 *     tags:
 *       - Organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationUpdateSchema'
 *     responses:
 *       200:
 *         description: Organización actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Actualiza una organización por su ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organizationFounded = await organizationService.getOrganizationById(id);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const body = await request.json();
        const dto = OrganizationUpdateSchema.parse(body);
        const updatedOrganization = await organizationService.updateOrganization(id, dto);

        return NextResponse.json(updatedOrganization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/organizations/{id}:
 *   delete:
 *     summary: Elimina una organización por su ID
 *     tags:
 *       - Organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       204:
 *         description: Organización eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Organización no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina una organización por su ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organizationFounded = await organizationService.getOrganizationById(id);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        await organizationService.deleteOrganization(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};