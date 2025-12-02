import { NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";
import { TestimonialService } from "@/models/testimonial/testimonialService";

const testimonialService = new TestimonialService();
const personService = new PersonService();

// Obtiene testimonios por personaId
export async function GET(request: Request, { params }: { params: Promise<{ personaId: string }> }) {
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