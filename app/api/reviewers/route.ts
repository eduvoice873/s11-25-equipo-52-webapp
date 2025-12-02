import { NextResponse } from "next/server";
import { ReviewService } from "@/models/reviewer/reviewService";
import { ReviewCreateSchema } from "@/models/reviewer/dto/review";

const reviewService = new ReviewService();

// Crea una nueva revision
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const dto = ReviewCreateSchema.parse(body);
        const newReview = await reviewService.createReview(dto);

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

//Obtiene todas las revisiones
export async function GET() {
    const reviews = await reviewService.getAllReviews();
    return NextResponse.json(reviews, { status: 200 });
};