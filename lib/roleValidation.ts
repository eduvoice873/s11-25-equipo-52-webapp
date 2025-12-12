import { Session } from "next-auth";
import { redirect } from "next/navigation";

export type UserRole = "admin" | "editor";

/**
 * Valida que el usuario tenga una sesión activa
 */
export function requireAuth(session: Session | null) {
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session;
}

/**
 * Valida que el usuario sea admin
 */
export function requireAdmin(session: Session | null) {
  const validSession = requireAuth(session);

  if (validSession.user.rol !== "admin") {
    redirect("/login");
  }

  return validSession;
}

/**
 * Valida que el usuario sea editor
 */
export function requireEditor(session: Session | null) {
  const validSession = requireAuth(session);

  if (validSession.user.rol !== "editor") {
    redirect("/login");
  }

  return validSession;
}

/**
 * Valida que el usuario sea admin o editor
 */
export function requireAdminOrEditor(session: Session | null) {
  const validSession = requireAuth(session);

  if (validSession.user.rol !== "admin" && validSession.user.rol !== "editor") {
    redirect("/login");
  }

  return validSession;
}
