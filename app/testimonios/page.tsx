// app/testimonios/page.tsx

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TestimoniosDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
     


      {/* Contenido */}
      <main className="flex-1 px-8 py-8 space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark">
              Panel de testimonios
            </h1>
            <p className="text-sm text-slate-500">
              Crea formularios, comparte enlaces públicos y visualiza los
              testimonios que recibes.
            </p>
          </div>

          <Button asChild>
            <a href="/testimonios/nuevo">+ Nuevo formulario</a>
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Total testimonios" className="text-center">
            <p className="text-3xl font-bold text-brand-dark">462</p>
            <p className="text-xs text-slate-500 mt-1">
              Dato estático por ahora
            </p>
          </Card>

          <Card title="Formularios activos" className="text-center">
            <p className="text-3xl font-bold text-brand-dark">8</p>
            <p className="text-xs text-slate-500 mt-1">
              Número de formularios configurados
            </p>
          </Card>

          <Card title="Tasa de respuesta" className="text-center">
            <p className="text-3xl font-bold text-brand-dark">65%</p>
            <p className="text-xs text-slate-500 mt-1">
              Estimación basada en tus campañas
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
