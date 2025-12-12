import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "app/generated/prisma";

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout para cerrar sesión (compatible con Swagger)
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Logout OK. Cerrado sesión correctamente.
 */
export async function POST(request: NextRequest) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(request);
    if (authCheck) return authCheck;

    // Cierra la sesión y elimina la cookie
    await signOut({ redirect: false });

    const res = NextResponse.json({
        message: "Logout OK",
    });

    // Asegura la eliminación de la cookie
    res.cookies.set("next-auth.session-token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
    });

    return res;
}
