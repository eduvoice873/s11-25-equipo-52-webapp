import { NextRequest, NextResponse } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();
const testimonialService = new TestimonialService();

// Obtiene medios por testimonioId
export async function GET(request: NextRequest, { params }: { params: Promise<{ testimonioId: string }> }) {
    try {
        const { testimonioId } = await params;

        const testimonialFounded = await testimonialService.getTestimonialById(testimonioId);
        if (!testimonialFounded) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        const medios = await medioService.getMedioByTestimonioId(testimonioId);
        return NextResponse.json(sanitizeBigInt(medios), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}