import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { OrganizationService } from "@/models/organization/organizationService";

const organizationService = new OrganizationService();

// Obtiene una organización por el ID del usuario
export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { userId } = await params;
        const userFounded = await prisma.user.findUnique({ where: { id: userId } });

        if (!userFounded) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const organization = await organizationService.getOrganizationById(userFounded.organizacionId);

        if (!organization) return NextResponse.json({ error: "Organization not found" }, { status: 404 });
        return NextResponse.json(organization, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};