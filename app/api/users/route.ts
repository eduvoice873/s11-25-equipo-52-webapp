import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";
import { OrganizationService } from "@/models/organization/organizationService";
import bcrypt from "bcrypt";
import { roleRequired } from "@/lib/roleRequired";
import { Rol } from "@prisma/client";

const userService = new UserService();
const organizationService = new OrganizationService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  try {
    const { name, email, password, organizacion, organizacion_slug } = await request.json();

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return NextResponse.json({ error: "User already exists", field: "email" }, { status: 400 });
    }

    const foundOrganization = await organizationService.getOrganizationBySlug(organizacion_slug);

    if (foundOrganization) {
      return NextResponse.json({ error: "Organization already exists", field: "organization" }, { status: 400 });
    }

    const newOrganization = await organizationService.createOrganization({
      nombre: organizacion,
      slug: organizacion_slug,
    });

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        rol: "admin",
        organizacion: {
          connect: {
            id: newOrganization.id,
          },
        },
      },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });

    return NextResponse.json({ message: "User successfully created", data: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios tanto admins como editores
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Usuarios obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreateSchema'
 */
// Obtiene todos los usuarios tanto admins como editores
export async function GET(request: NextRequest) {
  const authCheck = await roleRequired([Rol.admin])(request);
  if (authCheck) return authCheck;

  const users = await userService.getAllUsers();
  return NextResponse.json(users, { status: 200 });
}