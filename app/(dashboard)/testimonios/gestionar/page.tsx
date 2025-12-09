"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Pencil, Trash2, Link2, PlusCircle, Loader, AlertCircle, Menu, X, MessageSquare } from "lucide-react";

interface Formulario {
  id: string;
  nombreFormulario: string;
  descripcion: string;
  slugPublico: string;
  createdAt: string;
  preguntas: any[];
  respuestasTotales?: number;
}

export default function GestionarFormulariosTestimonioPage() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cargar formularios de BD
  useEffect(() => {
    const cargarFormularios = async () => {
      try {
        setLoading(true);

        // ✅ LLAMAR A GET /api/formularios
        const response = await fetch("/api/formularios");

        if (!response.ok) {
          throw new Error("Error al cargar formularios");
        }

        const data = await response.json();

        // Mapear respuesta de BD a formato esperado
        const formulariosMapeados = data.formularios.map((f: any) => ({
          id: f.id,
          nombreFormulario: f.nombreFormulario,
          descripcion: f.descripcion,
          slugPublico: f.slugPublico,
          createdAt: f.creadoEn || new Date().toISOString(),
          preguntas: f.preguntas || [],
          categoriaId: f.categoriaId,
          categoria: f.categoria,
          respuestasTotales: f.respuestasTotales || 0,
        }));

        setFormularios(formulariosMapeados);
        console.log(" Formularios cargados de BD:", formulariosMapeados);
      } catch (err) {
        console.error(" Error:", err);
        setError(err instanceof Error ? err.message : "Error al cargar formularios");
      } finally {
        setLoading(false);
      }
    };

    cargarFormularios();
  }, []);

  const handleCopy = async (slug: string) => {
    try {
      const link = `${window.location.origin}/f/${slug}`;
      await navigator.clipboard.writeText(link);
      alert(" Enlace copiado al portapapeles");
    } catch {
      alert(" No se pudo copiar el enlace");
    }
  };

  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este formulario?")) {
      try {
        //  LLAMAR A DELETE /api/formularios/admin/[id]
        const response = await fetch(`/api/formularios/admin/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar formulario");
        }

        // Actualizar lista localmente
        const formularioesActualizados = formularios.filter(f => f.id !== id);
        setFormularios(formularioesActualizados);
        alert("✅ Formulario eliminado");
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("❌ Error al eliminar el formulario");
      }
    }
  };

  const calcularDiasAtras = (fecha: string) => {
    const ahora = new Date();
    const fechaCreacion = new Date(fecha);
    const diferencia = ahora.getTime() - fechaCreacion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (dias === 0) return "Hoy";
    if (dias === 1) return "Ayer";
    if (dias < 7) return `Hace ${dias} días`;
    if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
    return `Hace ${Math.floor(dias / 30)} meses`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600">Cargando formularios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out z-50 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-indigo-600">Testimonios</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2 text-sm">
            <a
              href="/testimonios"
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Panel principal
            </a>
            <a
              href="/formulario/nuevo"
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Crear formulario
            </a>
            <a
              href="/testimonios/gestionar"
              className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-semibold"
            >
              Gestionar formularios
            </a>
          </nav>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-auto">
        {/* Header Móvil */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900">Testimonios</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Formularios creados
              </h1>
              <p className="text-sm text-slate-500">
                Administra los formularios que envías a tus estudiantes.
              </p>
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <a href="/formulario/nuevo">
                <PlusCircle className="w-4 h-4 mr-2" />
                Nuevo formulario
              </a>
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Sin formularios */}
          {formularios.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No hay formularios creados
              </h3>
              <p className="text-slate-600 mb-6">
                Crea tu primer formulario para comenzar a recopilar testimonios
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <a href="/formulario/nuevo">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Crear primer formulario
                </a>
              </Button>
            </div>
          ) : (
            /* LISTA DE FORMULARIOS */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {formularios.map((formulario) => (
                <Card
                  key={formulario.id}
                  className="p-6 space-y-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <header className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {formulario.nombreFormulario}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {formulario.descripcion}
                    </p>
                  </header>

                  <div className="text-xs text-slate-500 space-y-1">
                    <p>
                      <span className="font-semibold">Preguntas:</span>{" "}
                      {formulario.preguntas?.length || 0}
                    </p>
                    <p>
                      <span className="font-semibold">Última actualización:</span>{" "}
                      {calcularDiasAtras(formulario.createdAt)}
                    </p>
                    <p>
                      <span className="font-semibold">URL:</span>{" "}
                      <code className="text-indigo-600 bg-slate-100 px-1 py-0.5 rounded text-xs">
                        /{formulario.slugPublico}
                      </code>
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-200">
                    <div className="flex items-stretch sm:items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(formulario.slugPublico)}
                        className="text-xs"
                      >
                        <Link2 className="w-4 h-4 mr-1" /> Copiar link
                      </Button>

                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          title="Ver formulario"
                          asChild
                        >
                          <a
                            href={`/f/${formulario.slugPublico}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          title="Editar formulario"
                          asChild
                        >
                          <a href={`/formulario/${formulario.id}/edit`}>
                            <Pencil className="w-4 h-4" />
                          </a>
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          title="Eliminar formulario"
                          onClick={() => handleEliminar(formulario.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Botón de Ver Respuestas */}
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      asChild
                    >
                      <a href={`/formulario/${formulario.id}/respuestas`}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ver Respuestas ({formulario.respuestasTotales || 0})
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
