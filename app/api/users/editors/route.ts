import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UserService } from "@/models/user/userService";
import { OrganizationService } from "@/models/organization/organizationService";
import { UserCreateSchema } from "@/models/user/dto/user";
import bcrypt from "bcrypt";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const userService = new UserService();
const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/users/editors:
 *   post:
 *     summary: Crea un usuario con rol editor
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                   type: string
 *               email:
 *                   type: string
 *               password:
 *                   type: string
 *               confirm:
 *                   type: string
 *               image:
 *                   type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirm
 *               - image
 *     responses:
 *       201:
 *         description: Editor creado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Crear un usuario con rol editor
export async function POST(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

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

/**
 * @openapi
 * /api/users/editors:
 *   get:
 *     summary: Obtiene todos los usuarios con el rol de editor
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Usuarios con rol editor obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateSchema'
 */
// Obtiene usuarios con rol editor
export async function GET(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    const usersEditors = await userService.getUserByEditorRol();
    return NextResponse.json(usersEditors, { status: 200 });
}