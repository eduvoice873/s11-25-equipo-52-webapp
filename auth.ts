import prisma from "./lib/db";


authorize: async (credentials) => {
  // ...existing code...

  const user = await prisma.user.findUnique({
    where: { email: credentials?.email as string }
  });

  if (!user) return null;

  // Ahora TypeScript acepta la estructura completa
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    rol: user.rol,
    activo: user.activo,
    organizacionId: user.organizacionId,
  };
}