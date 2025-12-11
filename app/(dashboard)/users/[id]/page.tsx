import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserDetailsClientEdit from "@/components/users/UserDetailsClientEdit";
import prisma from "@/lib/db";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  // Obtener el usuario de la base de datos
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    return (
      <div className="w-full p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Usuario no encontrado</p>
        </div>
      </div>
    );
  }

  return <UserDetailsClientEdit user={user} />;
}
