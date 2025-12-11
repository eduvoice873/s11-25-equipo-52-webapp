import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";
import { TagService } from "@/models/tag/tagService";
import { TagCreateSchema } from "@/models/tag/dto/tag";

const tagService = new TagService();

/**
 * @openapi
 * /api/tags:
 *   post:
 *     summary: Crea una etiqueta
 *     tags:
 *       - Etiqueta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizacionId:
 *                   type: string
 *               nombre:
 *                   type: string
 *             required:
 *               - organizacionId
 *               - nombre
 *     responses:
 *       201:
 *         description: Etiqueta creada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Crea una nueva etiqueta
export async function POST(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
    if (authCheck) return authCheck;

    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = TagCreateSchema.parse(body);
        const newTag = await tagService.createTag(dto);

        return NextResponse.json(newTag, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/tags:
 *   get:
 *     summary: Obtiene todas las etiquetas
 *     tags:
 *       - Etiqueta
 *     responses:
 *       200:
 *         description: Etiquetas obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tag:
 *                     $ref: '#/components/schemas/TagCreateSchema'
 */
// Obtiene todas las etiquetas
export async function GET(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
    if (authCheck) return authCheck;

    const tags = await tagService.getAllTags();
    return NextResponse.json(tags, { status: 200 });
};