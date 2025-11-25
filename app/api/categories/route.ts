import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";
import { CategoryFullCreateSchema } from "@/models/categoryFull/dto/categoryFull";
import { CreateCategoryFullService } from "@/models/categoryFull/createCategoryFullService";

const categoryService = new CategoryService();
const createCategoryFullService = new CreateCategoryFullService();

// Crea una nueva categoría
export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();

        const dto = CategoryFullCreateSchema.parse(body);

        const result = await createCategoryFullService.createCategoryFull(dto);

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Obtiene todas las categorías
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories, { status: 200 });
};