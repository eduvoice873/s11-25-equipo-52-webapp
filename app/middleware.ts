import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Rol } from "app/generated/prisma";

const ADMIN_ONLY = ["/api/users", "/api/categories", "/api/formularios", "/api/dashboard"];
const EDITOR_ONLY = ["/api/testimonials"];
const ADMIN_OR_EDITOR = ["/api/organizations", "/api/tags", "/api/questions", "api/logout",
  "/api/medios", "/api/perfil", "/api/testimonials"
];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  console.log(">>> Middleware ejecutado en:", pathname);

  // --- 1. Rutas públicas ---
  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/api/persons") ||
    pathname.startsWith("/api/medios") ||
    pathname.startsWith("/api/respuestas-formulario")
  ) {
    return NextResponse.next();
  }

  // --- 2. Si NO hay sesión / token ---
  if (!session) {
    console.log("No hay sesión");
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 401 }
    );
  }

  if (!session.user?.rol) {
    console.log("Sesión sin rol");
    return NextResponse.json(
      { message: "No autorizado - rol faltante" },
      { status: 401 }
    );
  }

  const userRole: Rol = session.user?.rol;

  console.log("ROL DETECTADO:", userRole);

  // --- 3. Rutas solo para Admin ---
  if (ADMIN_ONLY.some((ruta) => pathname.startsWith(ruta))) {
    if (userRole !== Rol.admin) {
      console.log("Acceso denegado → Solo admin");
      return NextResponse.json(
        { message: "Acceso denegado" },
        { status: 403 }
      );
    }
  }

  // --- 4. Rutas solo para Editor ---
  if (EDITOR_ONLY.some((ruta) => pathname.startsWith(ruta))) {
    if (userRole !== Rol.editor) {
      console.log("Acceso denegado → Solo editor");
      return NextResponse.json(
        { message: "Acceso denegado" },
        { status: 403 }
      );
    }
  }

  // --- 5. Rutas para Admin O Editor ---
  if (ADMIN_OR_EDITOR.some((ruta) => pathname.startsWith(ruta))) {
    if (![Rol.admin, Rol.editor].includes(userRole)) {
      console.log("Acceso denegado → Admin o Editor");
      return NextResponse.json(
        { message: "Acceso denegado" },
        { status: 403 }
      );
    }
  }

  console.log("Acceso concedido");
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
  runtime: "nodejs", // 👈 Asegura que los logs sí se vean
};
