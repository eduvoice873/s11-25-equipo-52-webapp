import SignoutBtn from "@/components/auth/SignoutBtn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10 border-2 p-4">
        <h1>Bienvenid@ {session?.user?.name}</h1>
        <SignoutBtn />
      </div>
    </div>
  );
}
