import { NextResponse } from "next/server";
import prisma from "@/lib/db";
// import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";

const categoryService = new CategoryService();

// Obtiene categorías por el ID del creador
export async function GET(request: Request, { params }: { params: Promise<{ creadoPorId: string }> }) {
    try {
        const { creadoPorId } = await params;
        const userFounded = await prisma.user.findUnique({ where: { id: creadoPorId } });

        if (!userFounded) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const categories = await categoryService.getCategoryByCreadoPorId(creadoPorId);
        if (!categories) return NextResponse.json({ error: "Categories not found" }, { status: 404 });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};