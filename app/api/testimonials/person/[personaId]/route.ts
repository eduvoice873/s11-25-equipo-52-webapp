import { NextRequest, NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const testimonialService = new TestimonialService();
const personService = new PersonService();

/**
 * @openapi
 * /api/testimonials/person/{personaId}:
 *   get:
 *     summary: Obtiene testimonios por personaId
 *     tags:
 *       - Testimonios
 *     parameters:
 *       - in: path
 *         name: personaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Testimonios obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene testimonios por personaId
export async function GET(request: NextRequest, { params }: { params: Promise<{ personaId: string }> }) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
    if (authCheck) return authCheck;

    try {
        const { personaId } = await params;

        const personFounded = await personService.getPersonById(personaId);
        if (!personFounded) return NextResponse.json({ message: "Person not found" }, { status: 404 });

        const testimonials = await testimonialService.getTestimonialsByPersonaId(personaId);
        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};