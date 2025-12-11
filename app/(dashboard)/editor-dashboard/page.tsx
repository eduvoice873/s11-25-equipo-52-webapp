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

        {/* Componente Placeholder */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-brand-blue mb-2">
            ¡Hola bienvenido editor!
          </h2>
          <p className="text-gray-600">
            Este es un espacio reservado para un componente que será agregado próximamente.
          </p>
        </div>

        {/*
        // Alert si no tiene categoría asignada
        {!editorCategory && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  No tienes una categoría asignada. Contacta al administrador.
                </p>
              </div>
            </div>
          </div>
        )}

        // Alert de Respuestas Pendientes
        {respuestasPendientes > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  Tienes {respuestasPendientes} respuesta{respuestasPendientes > 1 ? 's' : ''} de formulario pendiente{respuestasPendientes > 1 ? 's' : ''} de revisión
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

        // Categoría Asignada
        {editorCategory && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mi Categoría</h2>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-2xl font-bold text-gray-900">{editorCategory.nombre}</h3>
              {editorCategory.titulo && (
                <p className="text-gray-600 mt-2">{editorCategory.titulo}</p>
              )}
              {editorCategory.mensaje && (
                <p className="text-gray-500 text-sm mt-3 italic">"{editorCategory.mensaje}"</p>
              )}
            </div>
          </section>
        )}

        // Stats Grid
        {editorCategory && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            // Total de Testimonios
            <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Testimonios</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{testimonios.length}</p>
              </div>
            </div>

            // Aprobados
            <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
              <div className="bg-green-100 rounded-lg p-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Aprobados</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{testimoniosAprobados}</p>
              </div>
            </div>

            // Pendientes
            <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
              <div className="bg-yellow-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{testimoniosPendientes}</p>
              </div>
            </div>

            // Rechazados
            <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Rechazados</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{testimoniosRechazados}</p>
              </div>
            </div>
          </div>
        )}

        // Acciones Rápidas
        {editorCategory && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/gestionTestimonio" className="flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>Ver Testimonios Pendientes</span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/categories/${editorCategory.id}`} className="flex items-center gap-2">
                  <FileText size={18} />
                  <span>Ver Categoría</span>
                </Link>
              </Button>
            </div>
          </section>
        )}
        */}

      </main>
    </div>
  );
}
