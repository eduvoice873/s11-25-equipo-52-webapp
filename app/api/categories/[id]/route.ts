import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/models/category/categoryService";
import { CategoryUpdateSchema } from "@/models/category/dto/category";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const categoryService = new CategoryService();

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría obtenida
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno
 */
// Obtiene una categoría por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;
        const category = await categoryService.getCategoryById(id);
        if (!category) return NextResponse.json({ error: "No se encontró la categoría" }, { status: 404 });

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Actualiza una categoría por su ID
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdateSchema'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Categoría no encontrada
 *       500:
 *         description: Error interno
 */
// Actualiza una categoría por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;

        const categoryFounded = await categoryService.getCategoryById(id);
        if (!categoryFounded) return NextResponse.json({ error: "No se encontró la categoría" }, { status: 404 });

        const body = await request.json();

        // Extraer solo los datos de la categoría si vienen anidados
        const categoryData = body.category || body;
        const dto = CategoryUpdateSchema.parse(categoryData);

        const updatedCategory = await categoryService.updateCategory(id, dto);

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     summary: Actualiza alguna parte de una categoría por su ID
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdateSchema'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Categoría no encontrada
 *       500:
 *         description: Error interno
 */
// Alias para PATCH (mismo comportamiento que PUT)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    return PUT(request, { params });
}

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     tags:
 *       - Categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Categoría no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina una categoría por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;

        const categoryFounded = await categoryService.getCategoryById(id);
        if (!categoryFounded) return NextResponse.json({ error: "No se encontró la categoría" }, { status: 404 });

        await categoryService.deleteCategory(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}