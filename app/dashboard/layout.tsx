import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { GlobalContextProvider } from "@/contexts/global/globalContext";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) redirect("/login");

  const rol = session?.user?.rol ?? "editor";

  return (
    <GlobalContextProvider>
      <DashboardLayout role={rol}>{children}</DashboardLayout>
    </GlobalContextProvider>
  );
}
