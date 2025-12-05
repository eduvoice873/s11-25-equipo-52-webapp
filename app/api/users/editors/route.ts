import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UserService } from "@/models/user/userService";
import { OrganizationService } from "@/models/organization/organizationService";
import { UserCreateSchema } from "@/models/user/dto/user";
import bcrypt from "bcrypt";

const userService = new UserService();
const organizationService = new OrganizationService();

// Crear un editor
export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const dto = UserCreateSchema.parse(body);

        const userFounded = await userService.getUserByEmail(dto.email);

        if (userFounded) {
            return NextResponse.json({ error: "User already exists", field: "email" }, { status: 400 });
        }

        const organizationId = await organizationService.getOrganizationIdByUserId(userId);
        if (!organizationId) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

        const newUserEditor = await userService.createUserEditor(dto, hashedPassword, organizationId);
        return NextResponse.json(newUserEditor, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Obtener todos los editores
export async function GET() {
    const usersEditors = await userService.getUserByEditorRol();
    return NextResponse.json(usersEditors, { status: 200 });
}