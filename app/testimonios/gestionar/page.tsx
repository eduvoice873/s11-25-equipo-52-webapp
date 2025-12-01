"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Pencil, Trash2, Link2, PlusCircle } from "lucide-react";

export default function GestionarFormulariosTestimonioPage() {
  // MOCK hasta conectar al backend
  const formulariosMock = [
    {
      id: "form-1",
      nombre: "Case Study Q4",
      descripcion: "Testimonios para la campaña Q4",
      slug: "case-study-q4",
      fecha: "Hace 5 días",
      testimonios: 32,
      estado: "Activo",
    },
    {
      id: "form-2",
      nombre: "Bootcamp Frontend 2025",
      descripcion: "Envío de experiencias de estudiantes",
      slug: "bootcamp-frontend-2025",
      fecha: "Hace 2 semanas",
      testimonios: 14,
      estado: "Activo",
    },
    {
      id: "form-3",
      nombre: "University Admissions 2024",
      descripcion: "Testimonios de postulantes",
      slug: "university-admissions",
      fecha: "Hace 1 mes",
      testimonios: 55,
      estado: "Borrador",
    },
  ];

  const handleCopy = async (slug: string) => {
    const link = `https://app.eduvoicecms.com/testimonios/enviar/${slug}`;
    await navigator.clipboard.writeText(link);
    alert("Enlace copiado al portapapeles");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
     

      {/* Contenido */}
      <main className="flex-1 px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark">
              Formularios creados
            </h1>
            <p className="text-sm text-slate-500">
              Administra los formularios que envías a tus estudiantes.
            </p>
          </div>

          <Button asChild>
            <a href="/testimonios/nuevo">
              <PlusCircle className="w-4 h-4 mr-2" />
              Nuevo formulario
            </a>
          </Button>
        </div>

        {/* LISTA DE FORMULARIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {formulariosMock.map((f) => (
            <Card key={f.id} className="p-6 space-y-4 shadow-sm border border-slate-200">
              <header className="space-y-1">
                <h3 className="text-lg font-semibold text-brand-dark">{f.nombre}</h3>
                <p className="text-sm text-slate-500">{f.descripcion}</p>
              </header>

              <div className="text-xs text-slate-500 space-y-1">
                <p>
                  <span className="font-semibold">Testimonios:</span> {f.testimonios}
                </p>
                <p>
                  <span className="font-semibold">Última actualización:</span> {f.fecha}
                </p>
                <p>
                  <span className="font-semibold">Estado:</span>{" "}
                  {f.estado === "Activo" ? (
                    <span className="text-green-600">Activo</span>
                  ) : (
                    <span className="text-yellow-600">Borrador</span>
                  )}
                </p>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(f.slug)}
                >
                  <Link2 className="w-4 h-4 mr-1" /> Copiar link
                </Button>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    asChild
                  >
                    <a href={`/testimonios/enviar/${f.slug}`} target="_blank">
                      <Eye className="w-4 h-4" />
                    </a>
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    asChild
                  >
                    <a href={`/testimonios/editar/${f.id}`}>
                      <Pencil className="w-4 h-4" />
                    </a>
                  </Button>

                  <Button size="icon" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
