import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import CategoriesCards from "@/components/category/CategoriesCards";
import DashboardStatsSection from "@/components/dashboard/DashboardStatsSection";
import PendingTestimonials from "@/components/dashboard/PendingTestimonials";

export default async function DashboardCategoryPage() {
  const session = await auth();


  if (!session?.user?.rol) {
    redirect("/login");
  }

  const organizacionId = session.user.organizacionId;

  if (!organizacionId) {
    redirect("/login");
  }

  // Obtener respuestas de formulario pendientes (testimonios por aprobar)
  const pendingCount = await prisma.respuestaFormulario.count({
    where: {
      formulario: {
        categoria: { organizacionId },
      },
      estado: "pendiente",
    },
  });

  return (
    <div className="min-h-screen bg-muted/30 font-nunito">
      <main className="p-8 max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-brand-light flex items-center gap-2">
            Bienvenid@, <span className="text-blue-900">{session.user.name}</span>
          </h1>
          <p className="text-gray-500">
            Gestiona tus categorías y testimonios desde aquí.
          </p>
        </section>

        {/* Alert de Testimonios Pendientes */}
        {pendingCount > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  Tienes {pendingCount} testimonio{pendingCount > 1 ? 's' : ''} pendiente{pendingCount > 1 ? 's' : ''} de revisión
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
              >
                <Link href="/gestionTestimonio">
                  Revisar ahora
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <DashboardStatsSection />

        {/* Grid de contenido */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Categorías */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Categorías</h2>
              <Button asChild className="bg-blue-800 hover:bg-blue-800/90">
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

          {/* Sidebar */}
          <aside>
            <Suspense fallback={<SidebarSkeleton />}>
              <PendingTestimonials organizacionId={organizacionId} />
            </Suspense>
          </aside>

        </div>
      </main>
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 space-y-3 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}