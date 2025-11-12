import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password } = await request.json();

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
