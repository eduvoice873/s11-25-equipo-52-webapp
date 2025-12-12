import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const userService = new UserService();

/**
 * @openapi
 * /api/users/administrators:
 *   get:
 *     summary: Obtiene todos los usuarios con el rol de administrador
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Usuarios con rol administrador obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreateSchema'
 */
// Obtiene usuarios con rol administrador
export async function GET(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin])(request);
    if (authCheck) return authCheck;

    const usersAdmins = await userService.getUserByAdminRol();
    return NextResponse.json(usersAdmins, { status: 200 });
}