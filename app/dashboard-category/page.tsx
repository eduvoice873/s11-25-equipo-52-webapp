import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

// UI Components & Icons
import CategoriesCards from "@/components/category/CategoriesCards";
import DashboardStatsSection from "@/components/dashboard/DashboardStatsSection";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard } from "lucide-react";


import { auth } from "@/lib/auth";

export default async function DashboardCategoryPage() {
  const session = await auth();


  if (!session?.user?.rol) {
    redirect("/login");
  }


  return (
    <div className="min-h-screen bg-muted/30 font-nunito">



      {/* CONTENT */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-brand-light flex items-center gap-2">
            Bienvenid@, <span className="text-blue-900">{session.user.name}</span>
           
          </h1>
          <p className="text-gray-500">Aquí puedes gestionar todas tus categorías y ver tu rendimiento.</p>
        </section>

        <DashboardStatsSection />

        {/* Categories Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800 font-lato flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-gray-500" />
              Categorías
            </h2>

            <Button
              asChild
              className="bg-blue-800 hover:bg-blue-800/90 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/categories/create" className="flex items-center gap-2">
                <Plus size={18} />
                <span>Crear Categoría</span>
              </Link>
            </Button>
          </div>

          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesCards />
          </Suspense>

        </section>
      </main>
    </div>
  );
}



function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  );
}
