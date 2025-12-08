import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { TagService } from "@/models/tag/tagService";
import { TagUpdateSchema } from "@/models/tag/dto/tag";

const tagService = new TagService();

// Obtiene una etiqueta por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tag = await tagService.getTagById(id);
        if (!tag) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        return NextResponse.json(tag, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza una etiqueta por ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tagFounded = await tagService.getTagById(id);
        if (!tagFounded) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        const body = await request.json();
        const dto = TagUpdateSchema.parse(body);
        const updatedTag = await tagService.updateTag(id, dto);

        return NextResponse.json(updatedTag, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina una etiqueta por ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const tagFounded = await tagService.getTagById(id);
        if (!tagFounded) return NextResponse.json({ error: "Tag not found" }, { status: 404 });

        await tagService.deleteTag(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};