import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";
import { CategoryUpdateSchema } from "@/models/category/dto/category";

const categoryService = new CategoryService();

// Obtiene una categoría por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const category = await categoryService.getCategoryById(id);
        if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza una categoría por ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const categoryFounded = await categoryService.getCategoryById(id);
        if (!categoryFounded) return NextResponse.json({ error: "Category not found" }, { status: 404 });

        const body = await request.json();
        const dto = CategoryUpdateSchema.parse(body);
        const updatedCategory = await categoryService.updateCategory(id, dto);

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Elimina una categoría por ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const categoryFounded = await categoryService.getCategoryById(id);
        if (!categoryFounded) return NextResponse.json({ error: "Category not found" }, { status: 404 });

        await categoryService.deleteCategory(id);
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}