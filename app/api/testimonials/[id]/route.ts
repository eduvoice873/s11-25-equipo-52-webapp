
import { NextRequest, NextResponse } from "next/server";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { OrganizationService } from "@/models/organization/organizationService";
import { TestimonialFullService } from "@/models/testimonialFull/testimonialFullService";
import { TestimonialFullUpdateSchema } from "@/models/testimonialFull/dto/testimonialFull";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const testimonialService = new TestimonialService();
const organizationService = new OrganizationService();
const createTestimonialFullService = new TestimonialFullService();

/**
 * @openapi
 * /api/testimonials/{id}:
 *   get:
 *     summary: Obtiene un testimonio por su ID
 *     tags:
 *       - Testimonios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del testimonio
 *     responses:
 *       200:
 *         description: Testimonio obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Testimonio no encontrado
 *       500:
 *          description: Error interno
 */
// Obtiene un testimonio por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const testimonial = await testimonialService.getTestimonialById(id);
        if (!testimonial) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        return NextResponse.json(sanitizeBigInt(testimonial), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

// Actualiza un testimonio por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const testimonialFounded = await testimonialService.getTestimonialById(id);
        if (!testimonialFounded) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        const organizacionId = await organizationService.getOrganizationIdByCategoryId(testimonialFounded.categoriaId);
        if (!organizacionId) return NextResponse.json({ error: "Organization not found for user" }, { status: 404 });

        const body = await request.json();
        const dto = TestimonialFullUpdateSchema.parse(body);
        const updatedTestimonial = await createTestimonialFullService.updateTestimonialFull(id, dto, organizacionId);

        return NextResponse.json(sanitizeBigInt(updatedTestimonial), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/testimonials/{id}:
 *   delete:
 *     summary: Elimina un testimonio por su ID
 *     tags:
 *       - Testimonios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del testimonio
 *     responses:
 *       204:
 *         description: Testimonio eliminado
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Testimonio no encontrado
 *       500:
 *          description: Error interno
 */
// Elimina un testimonio por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const testimonialFounded = await testimonialService.getTestimonialById(id);
        if (!testimonialFounded) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        await testimonialService.deleteTestimonial(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};