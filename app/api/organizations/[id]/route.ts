import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OrganizationService } from "@/models/organization/organizationService";
import { OrganizationUpdateSchema } from "@/models/organization/dto/organization";

const organizationService = new OrganizationService();

//Obtiene una organización por su ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organization = await organizationService.getOrganizationById(id);
        if (!organization) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        return NextResponse.json(organization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza una organización por su ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organizationFounded = await organizationService.getOrganizationById(id);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const body = await request.json();
        const dto = OrganizationUpdateSchema.parse(body);
        const updatedOrganization = await organizationService.updateOrganization(id, dto);

        return NextResponse.json(updatedOrganization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina una organización por su ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        const organizationFounded = await organizationService.getOrganizationById(id);
        if (!organizationFounded) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        await organizationService.deleteOrganization(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};