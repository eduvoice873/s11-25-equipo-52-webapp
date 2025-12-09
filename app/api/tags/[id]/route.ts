
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { TagService } from "@/models/tag/tagService";
import { TagUpdateSchema } from "@/models/tag/dto/tag";

const tagService = new TagService();

/**
 * @openapi
 * /api/tags/{id}:
 *   get:
 *     summary: Obtiene una etiqueta por su ID
 *     tags:
 *       - Etiqueta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la etiqueta
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
 *         description: Etiqueta no encontrada
 *       500:
 *         description: Error interno
 */
// Obtiene una etiqueta por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tag = await tagService.getTagById(id);
        if (!tag) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        return NextResponse.json(tag, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/tags/{id}:
 *   put:
 *     summary: Actualiza una etiqueta por su ID
 *     tags:
 *       - Etiqueta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la etiqueta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagUpdateSchema'
 *     responses:
 *       200:
 *         description: Etiqueta actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Actualiza una etiqueta por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tagFounded = await tagService.getTagById(id);
        if (!tagFounded) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        const body = await request.json();
        const dto = TagUpdateSchema.parse(body);
        const updatedTag = await tagService.updateTag(id, dto);

        return NextResponse.json(updatedTag, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/tags/{id}:
 *   delete:
 *     summary: Elimina una etiqueta por su ID
 *     tags:
 *       - Etiqueta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la etiqueta
 *     responses:
 *       204:
 *         description: Etiqueta eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Etiqueta no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina una etiqueta por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tagFounded = await tagService.getTagById(id);
        if (!tagFounded) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        await tagService.deleteTag(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};