import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { QuestionService } from "@/models/question/questionService";
import { QuestionUpdateSchema } from "@/models/question/dto/question";

const questionService = new QuestionService();

// Obtiene una pregunta por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const question = await questionService.getQuestionById(id);
        if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        return NextResponse.json(question, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza una pregunta por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const questionFounded = await questionService.getQuestionById(id);
        if (!questionFounded) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        const body = await request.json();
        const dto = QuestionUpdateSchema.parse(body);
        const updatedQuestion = await questionService.updateQuestion(id, dto);

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina una pregunta por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const questionFounded = await questionService.getQuestionById(id);
        if (!questionFounded) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        await questionService.deleteQuestion(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};