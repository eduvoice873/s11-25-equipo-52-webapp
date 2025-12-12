import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Rol } from "app/generated/prisma";

export function roleRequired(allowedRoles: Rol[]) {
    return async function (req: NextRequest) {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        const userRole = session.user.rol as Rol;

        if (!allowedRoles.includes(userRole)) {
            return NextResponse.json(
                { message: "Acceso denegado" },
                { status: 403 }
            );
        }

        return null; // OK
    };
}