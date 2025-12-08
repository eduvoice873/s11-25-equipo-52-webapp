import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { TagService } from "@/models/tag/tagService";
import { OrganizationService } from "@/models/organization/organizationService";

const tagService = new TagService();
const organizationService = new OrganizationService();

// Obtiene etiquetas por el ID de la organización
export async function GET(request: Request, { params }: { params: Promise<{ organizacionId: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { organizacionId } = await params;

        const organizationFounded = await organizationService.getOrganizationById(organizacionId);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const tags = await tagService.getTagsByOrganizacionId(organizacionId);
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};