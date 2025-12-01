"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image, Video, FileText, Star, Loader2, CheckCircle } from "lucide-react";

// --- Tipos e Interfaces ---
interface PageProps {
  params: { slug: string };
}

type Modalidad = "" | "texto" | "texto_imagen" | "video";

interface PreguntaConfig {
  id: number;
  texto: string;
  tipo: "texto_largo" | "texto_corto" | "calificacion";
  requerido: boolean;
}

interface FormDataState {
  nombreCompleto: string;
  correo: string;
  titulo: string;
  texto: string;
  modalidad: Modalidad;
  fotoUrl: string;
  videoUrl: string;
  respuestas: Record<number, string | number>;
}

const CONFIG_MOCK = {
  nombreFormulario: "Comparte tu experiencia",
  descripcion: "Tu opinión es valiosa y ayuda a futuros estudiantes a elegir con confianza.",
  pedirNombre: true,
  pedirCorreo: true,
  permitirTexto: true,
  permitirTextoImagen: true,
  permitirVideo: true,
  mensajeGracias: "¡Gracias por compartir tu experiencia! Tu testimonio se ha enviado correctamente.",
  preguntas: [
    { id: 1, texto: "¿Cómo fue tu experiencia general?", tipo: "texto_largo", requerido: true },
    { id: 2, texto: "¿Qué destacas del curso?", tipo: "texto_corto", requerido: false },
    { id: 3, texto: "¿Cuál es tu calificación?", tipo: "calificacion", requerido: true },
  ] as PreguntaConfig[],
};

export default function EnviarTestimonioPage({ params }: PageProps) {
  const { slug } = params;

  // --- Estado ---
  const [formData, setFormData] = useState<FormDataState>({
    nombreCompleto: "",
    correo: "",
    titulo: "",
    texto: "",
    modalidad: "",
    fotoUrl: "",
    videoUrl: "",
    respuestas: {},
  });

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- Handlers ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalidadSelect = (mode: Modalidad) => {
    setFormData((prev) => ({
      ...prev,
      modalidad: mode,
      fotoUrl: mode !== "texto_imagen" ? "" : prev.fotoUrl,
      videoUrl: mode !== "video" ? "" : prev.videoUrl,
      // Opcional: Limpiar respuestas si cambias a video para no enviar basura
      respuestas: mode === "video" ? {} : prev.respuestas
    }));
  };

  const handleRespuesta = (id: number, valor: string | number) => {
    setFormData((prev) => ({
      ...prev,
      respuestas: { ...prev.respuestas, [id]: valor },
    }));
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) { // Aumenté límite a 50MB para video
      alert("El archivo es demasiado grande (máx 50MB)");
      return;
    }

    setLoadingUpload(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "TU_PRESET");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "TU_CLOUD";
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
        { method: "POST", body: data }
      );

      if (!res.ok) throw new Error("Error subiendo archivo");

      const json = await res.json();
      setFormData((prev) => ({
        ...prev,
        [type === "image" ? "fotoUrl" : "videoUrl"]: json.secure_url,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Hubo un error al subir el archivo.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Payload Final:", formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">¡Recibido!</h1>
        <p className="text-slate-600 max-w-md text-lg">{CONFIG_MOCK.mensajeGracias}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-blue p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-3">{CONFIG_MOCK.nombreFormulario}</h1>
          <p className="text-slate-300 text-lg opacity-90">{CONFIG_MOCK.descripcion}</p>
        </div>

        <div className="p-8 space-y-8">
          {/* 1. Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONFIG_MOCK.pedirNombre && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nombre Completo</label>
                <Input
                  name="nombreCompleto"
                  placeholder="Ej. Juan Pérez"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </div>
            )}
            {CONFIG_MOCK.pedirCorreo && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
                <Input
                  name="correo"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* 2. Selector de Modalidad */}
          <div>
            <p className="text-base font-semibold text-slate-800 mb-4">
              ¿Cómo deseas compartir tu experiencia?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CONFIG_MOCK.permitirTexto && (
                <ModeButton
                  active={formData.modalidad === "texto"}
                  onClick={() => handleModalidadSelect("texto")}
                  icon={<FileText className="w-6 h-6" />}
                  label="Solo Texto"
                  colorClass="text-indigo-500"
                />
              )}
              {CONFIG_MOCK.permitirTextoImagen && (
                <ModeButton
                  active={formData.modalidad === "texto_imagen"}
                  onClick={() => handleModalidadSelect("texto_imagen")}
                  icon={<Image className="w-6 h-6" />}
                  label="Texto + Foto"
                  colorClass="text-amber-500"
                />
              )}
              {CONFIG_MOCK.permitirVideo && (
                <ModeButton
                  active={formData.modalidad === "video"}
                  onClick={() => handleModalidadSelect("video")}
                  icon={<Video className="w-6 h-6" />}
                  label="Video Testimonio"
                  colorClass="text-sky-500"
                />
              )}
            </div>
          </div>

          {/* --- CONTENIDO DINÁMICO --- */}
          {formData.modalidad && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">

              {/* 🔄 ORDEN 1: Uploaders (Aparece primero para imagen o video) */}
              {formData.modalidad === "texto_imagen" && (
                <MediaUploader
                  type="image"
                  url={formData.fotoUrl}
                  loading={loadingUpload}
                  onUpload={(e) => handleUpload(e, "image")}
                />
              )}

              {formData.modalidad === "video" && (
                <MediaUploader
                  type="video"
                  url={formData.videoUrl}
                  loading={loadingUpload}
                  onUpload={(e) => handleUpload(e, "video")}
                />
              )}

              {/* 🔄 ORDEN 2: Preguntas Adicionales (OCULTAS SI ES VIDEO) */}
              {formData.modalidad !== "video" && (
                <div className="bg-slate-50 p-6 rounded-xl space-y-6 border border-slate-100">
                  <h3 className="font-semibold text-slate-800">Preguntas adicionales</h3>
                  {CONFIG_MOCK.preguntas.map((p) => (
                    <QuestionRenderer
                      key={p.id}
                      config={p}
                      currentValue={formData.respuestas[p.id]}
                      onAnswer={handleRespuesta}
                    />
                  ))}
                </div>
              )}

              {/* 🔄 ORDEN 3: Campos de Texto Libre (Ahora al final) */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Título de tu reseña</label>
                  <Input
                    name="titulo"
                    placeholder="Resúmelo en pocas palabras..."
                    value={formData.titulo}
                    onChange={handleChange}
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                     {formData.modalidad === 'video' ? 'Comentario adicional (Opcional)' : 'Cuéntanos más detalles'}
                  </label>
                  <Textarea
                    name="texto"
                    placeholder={formData.modalidad === 'video' ? "Si deseas añadir una nota al video..." : "Describe tu experiencia completa aquí..."}
                    rows={4}
                    value={formData.texto}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Botón de Enviar */}
              <Button
                size="lg"
                className="w-full text-lg font-semibold h-12"
                onClick={handleSubmit}
                disabled={isSubmitting || loadingUpload}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  "Enviar Testimonio"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



function ModeButton({ active, onClick, icon, label, colorClass }: any) {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md ${
        active
          ? `border-brand-light bg-slate-50 ring-1 ring-slate-900`
          : "border-slate-200 hover:border-slate-300 bg-white"
      }`}
    >
      <div className={`mb-2 ${colorClass}`}>{icon}</div>
      <span className={`text-sm font-semibold ${active ? "text-slate-900" : "text-slate-500"}`}>
        {label}
      </span>
    </button>
  );
}

function MediaUploader({ type, url, loading, onUpload }: any) {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
      <div className="flex flex-col items-center gap-2">
        {loading ? (
          <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
        ) : url ? (
          type === "image" ? (
            <img src={url} alt="Preview" className="h-48 rounded-md object-cover shadow-sm" />
          ) : (
            <video src={url} controls className="h-48 rounded-md shadow-sm" />
          )
        ) : (
          <>
            <div className="p-3 bg-slate-100 rounded-full mb-2">
              {type === "image" ? (
                <Image className="w-6 h-6 text-slate-500" />
              ) : (
                <Video className="w-6 h-6 text-slate-500" />
              )}
            </div>
            <label className="cursor-pointer">
              <span className="bg-brand-yellow text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition">
                Seleccionar {type === "image" ? "Imagen" : "Video"}
              </span>
              <input type="file" className="hidden" accept={`${type}/*`} onChange={onUpload} />
            </label>
            <p className="text-xs text-slate-400 mt-2">
              {type === "image" ? "JPG, PNG (Máx 10MB)" : "MP4, MOV (Máx 50MB)"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function QuestionRenderer({ config, currentValue, onAnswer }: any) {
  return (
    <div>
      <label className="block font-medium text-slate-700 text-sm mb-2">
        {config.texto} {config.requerido && <span className="text-red-500">*</span>}
      </label>

      {config.tipo === "texto_corto" && (
        <Input
          value={currentValue || ""}
          onChange={(e) => onAnswer(config.id, e.target.value)}
        />
      )}

      {config.tipo === "texto_largo" && (
        <Textarea
          rows={3}
          value={currentValue || ""}
          onChange={(e) => onAnswer(config.id, e.target.value)}
        />
      )}

      {config.tipo === "calificacion" && (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onAnswer(config.id, star)}
              className="group focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (currentValue || 0)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 group-hover:text-amber-200"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}