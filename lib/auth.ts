import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { LoginUserSchema } from "@/models/zod/auth";
import bcrypt from "bcrypt";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

// @ts-expect-error - Prisma adapter has type issues with complex schemas
const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const zodResponse = LoginUserSchema.safeParse(credentials);

        if (zodResponse.success) {
          const { email, password } = zodResponse.data;

          const dbUser = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (dbUser && dbUser.password) {
            const passwordMatch = await bcrypt.compare(
              password,
              dbUser.password
            );

            if (passwordMatch) {
              //  Devuelve solo las propiedades que NextAuth espera
              return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                emailVerified: dbUser.emailVerified,
              };
            }
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      // Agrega propiedades personalizadas al token
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          token.rol = dbUser.rol;
          token.activo = dbUser.activo;
          token.organizacionId = dbUser.organizacionId;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Agrega propiedades del token a la sesión
      if (token && session.user) {
        session.user.rol = token.rol;
        session.user.activo = token.activo;
        session.user.organizacionId = token.organizacionId;
      }
      return session;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        if (!params.token.sub) {
          throw new Error("No user ID in token");
        }

        const sessionToken = uuid();

        const createdSession = await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});
