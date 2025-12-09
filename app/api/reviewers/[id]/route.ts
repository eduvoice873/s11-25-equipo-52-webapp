
import { NextRequest, NextResponse } from "next/server";
import { ReviewService } from "@/models/reviewer/reviewService";
import { ReviewUpdateSchema } from "@/models/reviewer/dto/review";

const reviewService = new ReviewService();

// Obtiene una revision por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const review = await reviewService.getReviewById(id);
        if (!review) return NextResponse.json({ message: "Review not found" }, { status: 404 });

        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

// Actualiza una revision por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const reviewFounded = await reviewService.getReviewById(id);
        if (!reviewFounded) return NextResponse.json({ message: "Review not found" }, { status: 404 });

        const body = await request.json();
        const dto = ReviewUpdateSchema.parse(body);
        const updateReview = await reviewService.updateReview(id, dto);

        return NextResponse.json(updateReview, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

// Elimina una revision por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const reviewFounded = await reviewService.getReviewById(id);
        if (!reviewFounded) return NextResponse.json({ message: "Review not found" }, { status: 404 });

        await reviewService.deleteReview(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};