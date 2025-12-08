import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { TagService } from "@/models/tag/tagService";
import { TagCreateSchema } from "@/models/tag/dto/tag";

const tagService = new TagService();

// Crea una nueva etiqueta
export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = TagCreateSchema.parse(body);
        const newTag = await tagService.createTag(dto);

        return NextResponse.json(newTag, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Obtiene todas las etiquetas
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tags = await tagService.getAllTags();
    return NextResponse.json(tags, { status: 200 });
};