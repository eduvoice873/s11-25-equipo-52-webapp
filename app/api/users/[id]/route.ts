import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";
import { UserUpdateSchema } from "@/models/user/dto/user";
import bcrypt from "bcrypt";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const userService = new UserService();

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupUserSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno
 */
//Obtiene un usuario por su ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;

        const user = await userService.getUserById(id);
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateSchema'
 *     responses:
 *       200:
 *         description: Usuario actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Usuario no encontrada
 *       500:
 *         description: Error interno
 */
// Actualiza un usuario por su ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;

        const userFounded = await userService.getUserById(id);
        if (!userFounded) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const body = await request.json();
        const dto = UserUpdateSchema.parse(body);

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

        const updatedUser = await userService.updateUser(id, {
            name: dto.name,
            password: hashedPassword,
            activo: dto.activo
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Usuario no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina un usuario por su ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    try {
        const { id } = await params;

        const userFounded = await userService.getUserById(id);
        if (!userFounded) return NextResponse.json({ message: "User not found" }, { status: 404 });

        await userService.deleteUser(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
