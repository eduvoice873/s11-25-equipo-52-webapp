import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/auth";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login usando email y password (compatible con Swagger)
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login OK. Devuelve sessionToken usable en Authorize.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionToken:
 *                   type: string
 *                   example: abc123-session-token
 */
// Inicia sesión
export async function POST(req: NextRequest) {
    const authCheck = await roleRequired([Rol.admin, Rol.editor])(req);
    if (authCheck) return authCheck;

    const { email, password } = await req.json();

    const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    if (result?.error) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    // NextAuth automáticamente genera la cookie correcta
    return NextResponse.json({
        message: "Login OK",
    });
}
