import { NextResponse } from "next/server";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { CreateTestimonialFullService } from "@/models/testimonialFull/testimonialFullService";
import { TestimonialFullCreateSchema } from "@/models/testimonialFull/dto/testimonialFull";

const testimonialService = new TestimonialService();
const testimonialFullService = new CreateTestimonialFullService();

/**
 * @openapi
 * /api/testimonios:
 *   post:
 *     summary: Crea un testimonio con persona incluida
 *     tags:
 *       - Testimonios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               person:
 *                 type: object
 *                 properties:
 *                   nombreCompleto:
 *                     type: string
 *                   correo:
 *                     type: string
 *                     format: email
 *                   fotoUrl:
 *                     type: string
 *                     format: uri
 *                 required:
 *                   - nombreCompleto
 *                   - correo
 *                   - fotoUrl
 *               testimonial:
 *                 type: object
 *                 properties:
 *                   categoriaId:
 *                     type: string
 *                     format: uuid
 *                   titulo:
 *                     type: string
 *                   texto:
 *                     type: string
 *                   modalidad:
 *                     type: string
 *                     enum: [ "texto_imagen", "video" ]
 *                   estado:
 *                     type: string
 *                     enum: [ "borrador", "en_revision", "aprobado", "publicado", "rechazado", "archivado" ]
 *                   destacado:
 *                     type: boolean
 *                   calificacion:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                 required:
 *                   - categoriaId
 *                   - titulo
 *                   - texto
 *                   - modalidad
 *                   - estado
 *                   - destacado
 *                   - calificacion
 *     responses:
 *       201:
 *         description: Testimonio creado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Crea un nuevo testimonio
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const dto = TestimonialFullCreateSchema.parse(body);
        const newTestimonial = await testimonialFullService.createTestimonialFull(dto);

        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

// Obtiene todos los testimonios
export async function GET() {
    const testimonials = await testimonialService.getAllTestimonials();
    return NextResponse.json(testimonials, { status: 200 });
};