import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/models/category/categoryService";
import { TestimonialService } from "@/models/testimonial/testimonialService";

const testimonialService = new TestimonialService();
const categoryService = new CategoryService();

/**
 * @openapi
 * /api/testimonials/category/{categoriaId}:
 *   get:
 *     summary: Obtiene testimonios por categoriaId
 *     tags:
 *       - Testimonios
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Testimonios obtenidos
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/TestimonialCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene testimonios por categoriaId
export async function GET(request: NextRequest, { params }: { params: Promise<{ categoriaId: string }> }) {
    try {
        const { categoriaId } = await params;

        const categoryFounded = await categoryService.getCategoryById(categoriaId);
        if (!categoryFounded) return NextResponse.json({ message: "Category not found" }, { status: 404 });

        const testimonials = await testimonialService.getTestimonialsByCategoriaId(categoriaId);
        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};