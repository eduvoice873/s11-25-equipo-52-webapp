"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Image, Video, FileText, Link2, Eye, Save, ArrowLeft, Copy, Check } from "lucide-react";

// --- 1. Definición de Tipos ---
interface FormConfig {
  nombreFormulario: string;
  descripcion: string;
  pedirNombre: boolean;
  pedirCorreo: boolean;
  permitirTexto: boolean;
  permitirTextoImagen: boolean;
  permitirVideo: boolean;
  mensajeGracias: string;
  slugPublico: string;
}

export default function NuevoFormularioTestimonioPage() {
  // --- 2. Estado Inicial ---
  const [config, setConfig] = useState<FormConfig>({
    nombreFormulario: "Formulario de testimonio",
    descripcion: "Configura cómo quieres que tus estudiantes compartan su experiencia.",
    pedirNombre: true,
    pedirCorreo: true,
    permitirTexto: true,
    permitirTextoImagen: true,
    permitirVideo: true,
    mensajeGracias: "¡Gracias por compartir tu experiencia! Tu testimonio nos ayuda a mejorar.",
    slugPublico: "campana-frontend-2025",
  });

  const [copied, setCopied] = useState(false);

  // Generamos la URL base dinámicamente (en prod esto vendría de ENV)
  const baseUrl = "https://app.eduvoicecms.com/testimonios/enviar";

  const publicUrl = useMemo(
    () => `${baseUrl}/${config.slugPublico}`,
    [config.slugPublico]
  );

  // --- 3. Handlers Optimizados ---

  const handleToggle = (key: keyof FormConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  // Validación automática de SLUG (URL friendly)
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")       // Espacios a guiones
      .replace(/[^a-z0-9-]/g, ""); // Eliminar caracteres especiales
    setConfig((prev) => ({ ...prev, slugPublico: val }));
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Feedback visual temporal
    } catch {
      alert("No se pudo copiar el enlace");
    }
  };

  const handleSave = () => {
    // Aquí iría la llamada a tu API (POST /api/forms)
    console.log("Payload a guardar:", config);
    alert("¡Configuración guardada exitosamente!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar (Mock visual para contexto) */}
      <aside className="w-64 bg-white border-r px-6 py-6 space-y-4">
        <h2 className="text-lg font-bold text-brand-dark">Testimonios</h2>
        <nav className="space-y-2 text-sm">
          <a href="/testimonios" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
            Panel principal
          </a>
          <a
            href="/testimonios/nuevo"
            className="block px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Crear formulario
          </a>
          <a  href="/testimonios/gestionar" className="block px-3 py-2 rounded-lg bg-slate-100 font-semibold">
            Gestionar formularios
          </a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">

            {/* Topbar de Acción */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <button onClick={() => window.history.back()} className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 mb-1 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al panel
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Nuevo Formulario</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white" onClick={() => window.history.back()}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* COLUMNA IZQUIERDA: Configuración (7 cols) */}
            <section className="xl:col-span-7 space-y-6">

                {/* 1. Información General */}
                <CardWrapper title="Información General" description="Datos básicos de identificación del formulario.">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Nombre Interno</label>
                            <Input
                                name="nombreFormulario"
                                value={config.nombreFormulario}
                                onChange={handleChange}
                                placeholder="Ej: Testimonios Bootcamp 2024"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Descripción Pública</label>
                            <Textarea
                                name="descripcion"
                                value={config.descripcion}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Mensaje que leerán tus estudiantes..."
                            />
                        </div>
                    </div>
                </CardWrapper>

                {/* 2. Configuración de Campos */}
                <CardWrapper title="Datos del Estudiante" description="Define qué información personal es obligatoria.">
                    <div className="space-y-5">
                        <SwitchRow
                            label="Solicitar Nombre"
                            desc="Si se desactiva, el testimonio será anónimo."
                            checked={config.pedirNombre}
                            onToggle={() => handleToggle("pedirNombre")}
                        />
                        <div className="h-px bg-slate-100" />
                        <SwitchRow
                            label="Solicitar Correo"
                            desc="Útil para verificar la autenticidad o contactar."
                            checked={config.pedirCorreo}
                            onToggle={() => handleToggle("pedirCorreo")}
                        />
                    </div>
                </CardWrapper>

                {/* 3. Modalidades */}
                <CardWrapper title="Formatos Permitidos" description="Selecciona cómo pueden responder tus estudiantes.">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <OptionCard
                            active={config.permitirTexto}
                            onClick={() => handleToggle("permitirTexto")}
                            icon={<FileText className="w-5 h-5" />}
                            label="Solo Texto"
                            color="indigo"
                        />
                        <OptionCard
                            active={config.permitirTextoImagen}
                            onClick={() => handleToggle("permitirTextoImagen")}
                            icon={<Image className="w-5 h-5" />}
                            label="Texto + Imagen"
                            color="amber"
                        />
                        <OptionCard
                            active={config.permitirVideo}
                            onClick={() => handleToggle("permitirVideo")}
                            icon={<Video className="w-5 h-5" />}
                            label="Video"
                            color="sky"
                        />
                    </div>
                    {!config.permitirTexto && !config.permitirTextoImagen && !config.permitirVideo && (
                        <p className="text-sm text-red-500 mt-2">⚠️ Debes seleccionar al menos una modalidad.</p>
                    )}
                </CardWrapper>

                {/* 4. Enlace Público */}
                <CardWrapper title="Configuración de Enlace" description="Personaliza la URL donde se alojará el formulario.">
                     <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Slug de la URL</label>
                        <div className="flex items-center">
                            <span className="bg-slate-100 border border-r-0 border-slate-300 text-slate-500 px-3 py-2 rounded-l-md text-sm">
                                .../enviar/
                            </span>
                            <Input
                                className="rounded-l-none font-mono text-sm"
                                value={config.slugPublico}
                                onChange={handleSlugChange}
                            />
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <Link2 className="w-4 h-4 text-indigo-500 shrink-0" />
                                <span className="text-xs sm:text-sm text-indigo-700 truncate">{publicUrl}</span>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCopyLink}
                                className={copied ? "text-green-600 hover:text-green-700" : "text-indigo-600 hover:text-indigo-700"}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                     </div>
                </CardWrapper>

            </section>

            {/* COLUMNA DERECHA: Preview (Sticky) (5 cols) */}
            <aside className="xl:col-span-5">
                <div className="sticky top-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vista Previa en vivo</p>
                        <a href={publicUrl} target="_blank" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Abrir pestaña
                        </a>
                    </div>

                    {/* Marco de simulación de dispositivo/navegador */}
                    <div className="border border-slate-200 bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Barra de navegador falsa */}
                        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 rounded-md h-6 mx-2 text-[10px] flex items-center px-2 text-slate-400">
                                {baseUrl}/{config.slugPublico}
                            </div>
                        </div>

                        {/* Contenido del Preview */}
                        <div className="p-6 sm:p-8 bg-white min-h-[500px]">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-slate-900">{config.nombreFormulario || "Sin Título"}</h2>
                                    <p className="text-slate-500 mt-2 text-sm">{config.descripcion || "Sin descripción..."}</p>
                                </div>

                                <div className="space-y-4">
                                    {config.pedirNombre && (
                                        <Input disabled placeholder="Nombre completo" className="bg-slate-50 border-slate-200" />
                                    )}
                                    {config.pedirCorreo && (
                                        <Input disabled placeholder="correo@ejemplo.com" className="bg-slate-50 border-slate-200" />
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-medium text-slate-700">Selecciona modalidad:</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {config.permitirTexto && <PreviewModeIcon icon={<FileText />} label="Texto" />}
                                        {config.permitirTextoImagen && <PreviewModeIcon icon={<Image />} label="Foto" />}
                                        {config.permitirVideo && <PreviewModeIcon icon={<Video />} label="Video" />}
                                    </div>
                                    {!config.permitirTexto && !config.permitirTextoImagen && !config.permitirVideo && (
                                        <div className="text-center p-4 bg-slate-50 rounded border border-dashed text-slate-400 text-xs">
                                            No hay opciones disponibles
                                        </div>
                                    )}
                                </div>

                                <Button disabled className="w-full bg-slate-900 text-white">Enviar Testimonio</Button>

                                <div className="pt-4 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-400 mb-1">Mensaje de éxito:</p>
                                    <p className="text-xs text-emerald-600 font-medium bg-emerald-50 p-2 rounded">
                                        "{config.mensajeGracias}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            </div>
        </div>
      </main>
    </div>
  );
}

// --- Componentes UI Auxiliares para limpieza del código ---

function CardWrapper({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
                <CardDescription className="text-sm text-slate-500">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

function SwitchRow({ label, desc, checked, onToggle }: any) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-900">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <Switch checked={checked} onCheckedChange={onToggle} />
        </div>
    )
}

function OptionCard({ active, onClick, icon, label, color }: any) {
    const activeClass = {
        indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
        amber: "border-amber-400 bg-amber-50 text-amber-700",
        sky: "border-sky-400 bg-sky-50 text-sky-700",
    }[color as string] || "border-slate-200";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`border rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-200 ${
                active ? activeClass : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
        >
            <div className={active ? `text-${color}-600` : "text-slate-400"}>
                {icon}
            </div>
            <span className="text-xs font-semibold">{label}</span>
        </button>
    )
}

function NavItem({ href, label, active }: any) {
    return (
        <a href={href} className={`block px-3 py-2 rounded-md transition-colors ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
            {label}
        </a>
    )
}

function PreviewModeIcon({ icon, label }: any) {
    return (
        <div className="flex flex-col items-center justify-center p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 opacity-70">
            {/* Clonamos el elemento para pasarle clases de tamaño */}
            <div className="w-4 h-4 mb-1">{icon}</div>
            <span className="text-[10px]">{label}</span>
        </div>
    )
}