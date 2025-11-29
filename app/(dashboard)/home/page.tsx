import SignoutBtn from "@/components/auth/SignoutBtn";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10 border-2 p-4">
        <h1>Bienvenid@ {session?.user?.name}</h1>
        <SignoutBtn />
      </div>
    </div>
  );
}
