import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OrganizationService } from "@/models/organization/organizationService";
import { OrganizationCreateSchema } from "@/models/organization/dto/organization";

const organizationService = new OrganizationService();

// Crea una nueva organización
export async function POST(request: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = OrganizationCreateSchema.parse(body);
        const newOrganization = await organizationService.createOrganization(dto);

        return NextResponse.json(newOrganization, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Obtiene todas las organizaciones
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const organizations = await organizationService.getAllOrganizations();
    return NextResponse.json(organizations, { status: 200 });
};