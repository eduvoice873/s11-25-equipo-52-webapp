// app/testimonios/editar/[formId]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FileText, Image, Video, Link2, Eye } from "lucide-react";

interface EditarPageProps {
  params: {
    formId: string;
  };
}

export default function EditarFormularioPage({ params }: EditarPageProps) {
  const { formId } = params;

  // 🟦 MOCK — luego se reemplaza por fetch(`/api/forms/${formId}`)
  const mockFormulario = {
    nombreFormulario: "Testimonios Bootcamp 2024",
    descripcion: "Formulario para estudiantes del bootcamp",
    pedirNombre: true,
    pedirCorreo: false,
    permitirTexto: true,
    permitirTextoImagen: true,
    permitirVideo: false,
    mensajeGracias:
      "¡Gracias por tu aporte! Nos ayuda muchísimo a mejorar 🎉",
    slugPublico: "bootcamp-2024",
  };

  const [config, setConfig] = useState(mockFormulario);

  const publicUrl = useMemo(
    () =>
      `https://app.eduvoicecms.com/testimonios/enviar/${config.slugPublico}`,
    [config.slugPublico]
  );

  const handleToggle = (key: string) => {
    setConfig((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setConfig((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Guardando cambios:", config);
    alert("Cambios guardados (mock). Luego conectará al backend.");
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(publicUrl);
    alert("Enlace público copiado");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-6 space-y-4">
        <h2 className="text-lg font-bold text-brand-dark">Testimonios</h2>
        <nav className="space-y-2 text-sm">
          <a href="/testimonios" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
            Panel principal
          </a>
          <a href="/testimonios/nuevo" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
            Crear formulario
          </a>
          <a className="block px-3 py-2 rounded-lg bg-brand-light/20 font-semibold">
            Editar formulario
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-8 grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">

        {/* IZQUIERDA — Editor */}
        <section className="space-y-6">
          <header>
            <h1 className="text-2xl font-bold text-brand-dark">
              Editar formulario — {formId}
            </h1>
            <p className="text-sm text-slate-500">Modifica la configuración como desees.</p>
          </header>

          {/* Información General */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Información general</h2>

            <div>
              <label className="text-xs font-semibold text-slate-600">Nombre interno</label>
              <Input name="nombreFormulario" value={config.nombreFormulario} onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">Descripción</label>
              <Textarea name="descripcion" rows={3} value={config.descripcion} onChange={handleChange} />
            </div>
          </Card>

          {/* Datos solicitados */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Datos del estudiante</h2>

            <div className="flex items-center justify-between">
              <span>Nombre</span>
              <Switch checked={config.pedirNombre} onCheckedChange={() => handleToggle("pedirNombre")} />
            </div>

            <div className="flex items-center justify-between">
              <span>Correo</span>
              <Switch checked={config.pedirCorreo} onCheckedChange={() => handleToggle("pedirCorreo")} />
            </div>
          </Card>

          {/* Modalidades */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Modalidades permitidas</h2>

            <div className="grid grid-cols-3 gap-3">
              {/* Texto */}
              <button
                type="button"
                onClick={() => handleToggle("permitirTexto")}
                className={`p-4 border rounded-xl space-y-1 text-left
                  ${config.permitirTexto ? "border-brand-light bg-brand-light/10" : "border-slate-200"}
                `}
              >
                <FileText className="w-5 h-5" />
                <p className="text-sm font-semibold">Texto</p>
              </button>

              {/* Texto + imagen */}
              <button
                type="button"
                onClick={() => handleToggle("permitirTextoImagen")}
                className={`p-4 border rounded-xl space-y-1 text-left
                  ${config.permitirTextoImagen ? "border-amber-300 bg-amber-50/40" : "border-slate-200"}
                `}
              >
                <Image className="w-5 h-5" />
                <p className="text-sm font-semibold">Texto + Imagen</p>
              </button>

              {/* Video */}
              <button
                type="button"
                onClick={() => handleToggle("permitirVideo")}
                className={`p-4 border rounded-xl space-y-1 text-left
                  ${config.permitirVideo ? "border-sky-400 bg-sky-50/40" : "border-slate-200"}
                `}
              >
                <Video className="w-5 h-5" />
                <p className="text-sm font-semibold">Video</p>
              </button>
            </div>
          </Card>

          {/* Mensaje gracias */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Mensaje de agradecimiento</h2>
            <Textarea
              name="mensajeGracias"
              rows={3}
              value={config.mensajeGracias}
              onChange={handleChange}
            />
          </Card>

          {/* Slug */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Enlace público</h2>

            <Input name="slugPublico" value={config.slugPublico} onChange={handleChange} />

            <div className="flex items-center gap-2 text-sm bg-slate-100 rounded-lg px-3 py-2">
              <Link2 className="w-4 h-4" />
              <span className="truncate">{publicUrl}</span>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>Copiar</Button>
              <Button asChild variant="outline" size="sm">
                <a href={`/testimonios/enviar/${config.slugPublico}`} target="_blank">
                  <Eye className="w-4 h-4 mr-1" /> Vista pública
                </a>
              </Button>
            </div>
          </Card>

          {/* Guardar o cancelar */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar cambios</Button>
          </div>
        </section>

        {/* DERECHA — Vista previa */}
        <section className="hidden xl:block">
          <div className="sticky top-8 bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold mb-2">Vista previa</h3>

            <p className="text-sm text-slate-500 mb-3">
              Así verá el estudiante el formulario.
            </p>

            {/* Nombre */}
            {config.pedirNombre && <Input disabled placeholder="Tu nombre" className="mb-2" />}

            {/* Correo */}
            {config.pedirCorreo && <Input disabled placeholder="Tu correo" className="mb-2" />}

            {/* Modalidades */}
            <div className="space-y-2 mt-4 mb-4 text-xs">
              {config.permitirTexto && (
                <div className="bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Solo texto
                </div>
              )}
              {config.permitirTextoImagen && (
                <div className="bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-2">
                  <Image className="w-4 h-4" /> Texto + Imagen
                </div>
              )}
              {config.permitirVideo && (
                <div className="bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-2">
                  <Video className="w-4 h-4" /> Video
                </div>
              )}
            </div>

            <Textarea
              disabled
              rows={4}
              className="bg-slate-50 mb-4"
              placeholder="Escribe tu experiencia aquí…"
            />

            <Button disabled className="w-full">Enviar Testimonio</Button>

            <p className="text-[11px] text-slate-400 mt-3 italic">
              “{config.mensajeGracias}”
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
