import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
import { QuestionService } from "@/models/question/questionService";

const questionService = new QuestionService();

// Obtiene todas las preguntas
export async function GET() {
    const questions = await questionService.getAllQuestions();
    return NextResponse.json(questions, { status: 200 });
};