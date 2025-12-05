import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";
import { OrganizationService } from "@/models/organization/organizationService";
import { CategoryFullCreateSchema } from "@/models/categoryFull/dto/categoryFull";
import { CategoryFullService } from "@/models/categoryFull/categoryFullService";

const categoryService = new CategoryService();
const organizationService = new OrganizationService();
const categoryFullService = new CategoryFullService();

// Crea una nueva categoría
export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = CategoryFullCreateSchema.parse(body);

        const organizacionId = await organizationService.getOrganizationIdByUserId(userId);
        if (!organizacionId) return NextResponse.json({ error: "Organization not found for user" }, { status: 404 });

        const newCategory = await categoryFullService.createCategoryFull(dto, userId, organizacionId);

        return NextResponse.json(newCategory, { status: 201 });
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