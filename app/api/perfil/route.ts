import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";
import { UserUpdateSchema } from "@/models/user/dto/user";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

const userService = new UserService();

/**
 * @openapi
 * /api/perfil:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags:
 *       - Perfil
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationCreateSchema'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */
/**
 * GET /api/perfil
 * Obtiene el perfil del usuario autenticado
 */
export async function GET(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
  if (authCheck) return authCheck;

  try {
    // Obtener email del header (enviado por el cliente después de autenticarse)
    const email = request.headers.get("x-user-email");

    if (!email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Excluir contraseña en la respuesta
    const { password, ...userWithoutPassword } = user;

    // Transformar datos para incluir nombre de organización
    const response = {
      ...userWithoutPassword,
      organizacionNombre: typeof user.organizacionId === 'object' && user.organizacionId !== null ? (user.organizacionId as any).nombre : null,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/perfil:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/perfil
 * Actualiza el perfil del usuario autenticado
 */
export async function PUT(request: NextRequest) {
  try {
    // Obtener email del header
    const email = request.headers.get("x-user-email");

    if (!email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Obtener usuario actual
    const currentUser = await userService.getUserByEmail(email);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Parsear y validar cuerpo de la solicitud
    const body = await request.json();
    const validatedData = UserUpdateSchema.parse(body);

    // Hashear contraseña si se proporcionó
    const updateData: any = {
      name: validatedData.name,
      activo: validatedData.activo,
    };


    if (validatedData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(
        validatedData.password,
        saltRounds
      );
    }

    // Actualizar usuario
    const updatedUser = await userService.updateUser(
      currentUser.id,
      updateData
    );

    // Excluir contraseña en la respuesta
    const { password, ...userWithoutPassword } = updatedUser;

    const response = {
      ...userWithoutPassword,
      organizacionNombre: typeof updatedUser.organizacionId === 'object' && updatedUser.organizacionId !== null ? (updatedUser.organizacionId as any).nombre : null,
    };

    return NextResponse.json(
      { message: "Perfil actualizado exitosamente", user: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PUT /api/perfil:", error);

    // Errores de validación de Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    // Errores de JSON parsing
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "JSON inválido en el cuerpo de la solicitud" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
