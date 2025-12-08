import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [videos, textos, testimonios, spaces] = await Promise.all([
    prisma.medio.count({ where: { tipo: "video" } }),
    prisma.testimonio.count({ where: { modalidad: "texto_imagen" } }),
    prisma.testimonio.count(),
    prisma.categoria.count(),
  ]);

  const usage = Math.min(100, Math.round((spaces / 5) * 10));

  return NextResponse.json(
    {
      videos,
      textos,
      testimonios,
      spaces,
      plan: "Free",
      usage,
    },
    { status: 200 }
  );
}
