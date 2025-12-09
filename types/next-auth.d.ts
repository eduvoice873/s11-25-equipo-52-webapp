import { DefaultSession } from "next-auth";
import { Rol } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      rol?: Rol;
      activo?: boolean;
      organizacionId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rol?: Rol;
    activo?: boolean;
    organizacionId?: string;
    credentials?: boolean;
  }
}
