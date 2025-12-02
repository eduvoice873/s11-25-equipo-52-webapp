import { NextResponse } from "next/server";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { TestimonialFullService } from "@/models/testimonialFull/testimonialFullService";
import { TestimonialFullUpdateSchema } from "@/models/testimonialFull/dto/testimonialFull";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const testimonialService = new TestimonialService();
const createTestimonialFullService = new TestimonialFullService();

// Obtiene un testimonio por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const testimonialFounded = await testimonialService.getTestimonialById(id);
        if (!testimonialFounded) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        const body = await request.json();
        const dto = TestimonialFullUpdateSchema.parse(body);
        const updatedTestimonial = await createTestimonialFullService.updateTestimonialFull(id, dto);

        return NextResponse.json(updatedTestimonial, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

// Elimina un testimonio por ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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