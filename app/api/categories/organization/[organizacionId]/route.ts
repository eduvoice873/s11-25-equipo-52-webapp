import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";

const categoryService = new CategoryService();

// Obtiene categorías por el ID de la organización
export async function GET(request: NextRequest, { params }: { params: Promise<{ organizacionId: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { organizacionId } = await params;
        const organizationFounded = await prisma.organizacion.findUnique({ where: { id: organizacionId } });

        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const categories = await categoryService.getCategoryByOrganizacionId(organizacionId);

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};