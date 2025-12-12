import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText, CheckCircle2, Clock } from "lucide-react";
import { auth } from "@/lib/auth";
import { requireEditor } from "@/lib/roleValidation";
import prisma from "@/lib/db";

export default async function EditorDashboardPage() {
  const session = await auth();

  // Validar que sea editor
  const validSession = requireEditor(session);

  const userId = validSession.user.id;
  const organizacionId = validSession.user.organizacionId;

  if (!organizacionId) {
    redirect("/login");
  }

  // Obtener la categoría asignada al editor (donde es el creadoPor)
  const editorCategory = await prisma.categoria.findFirst({
    where: {
      organizacionId,
      creadoPorId: userId,
    },
  });

  // Obtener estadísticas de testimonios
  const testimonios = await prisma.testimonio.findMany({
    where: {
      categoriaId: editorCategory?.id,
    },
  });

  const testimoniosPendientes = testimonios.filter(t => t.estado === 'en_revision').length;
  const testimoniosAprobados = testimonios.filter(t => t.estado === 'aprobado' || t.estado === 'publicado').length;
  const testimoniosRechazados = testimonios.filter(t => t.estado === 'rechazado').length;

  // Obtener respuestas de formulario pendientes
  const respuestasPendientes = await prisma.respuestaFormulario.count({
    where: {
      formulario: {
        categoriaId: editorCategory?.id,
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
            Bienvenid@, <span className="text-blue-900">{validSession.user.name}</span>
          </h1>
          <p className="text-gray-500">
            Gestiona los testimonios de tu categoría asignada.
          </p>
        </section>



        {/* Componente Placeholder sera remplazado con el componente que crea la compañera lidea*/}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-blue mb-2">
            ¡Hola bienvenido editor!
          </h2>
          <p className="text-gray-600">
            Este es un espacio reservado para un componente que será agregado próximamente.
          </p>
        </div>



      </main>
    </div>
  );
}
