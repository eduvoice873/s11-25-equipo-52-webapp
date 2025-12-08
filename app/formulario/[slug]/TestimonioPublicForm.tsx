"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader,
  AlertCircle,
  CheckCircle,
  Upload,
  X,
} from "lucide-react";

interface FormularioTestimonio {
  id: string;
  organizacionId: string;
  nombreFormulario: string;
  descripcion: string;
  pedirNombre: boolean;
  pedirCorreo: boolean;
  permitirTexto: boolean;
  permitirTextoImagen: boolean;
  permitirVideo: boolean;
  mensajeGracias: string;
  preguntas: any[];
}

interface TestimonioPublicFormProps {
  slug: string;
}

export default function TestimonioPublicForm({ slug }: TestimonioPublicFormProps) {
  const [formulario, setFormulario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [imagenUrl, setImagenUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [imagenPublicId, setImagenPublicId] = useState<string>("");
  const [videoPublicId, setVideoPublicId] = useState<string>("");
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);

  // Cargar formulario al montar
  useEffect(() => {
    async function cargarFormulario() {
      try {
        setLoading(true);
        setIsError(false);
        setErrorMessage(null);

        console.log(" Cargando formulario con slug:", slug);

        const response = await fetch(`/api/formularios/${slug}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'No se pudo cargar el formulario');
        }

        const data = await response.json();
        console.log(" Formulario cargado:", data);

        setFormulario(data.formulario || data);
      } catch (error) {
        console.error(" Error al cargar formulario:", error);
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : 'Error al cargar el formulario');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      cargarFormulario();
    }
  }, [slug]);

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    texto: "",
    calificacion: 5,
    fotoUrl: "image.png",
    respuestas: {} as Record<string, any>,
  });

  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  interface CloudinaryResponse {
    secure_url: string;
    width: number;
    height: number;
    duration: number;
    bytes: number;
  }

  const [cloudinaryVideo, setCloudinaryVideo] = useState<CloudinaryResponse | null>(null);



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePreguntaChange = (id: string, value: any) => {
    setFormData((p) => ({
      ...p,
      respuestas: { ...p.respuestas, [id]: value },
    }));
  };

  const handleFotoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      // El error se manejará por el estado del hook
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // El error se manejará por el estado del hook
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFoto(reader.result as string);
      setFormData((p) => ({ ...p, fotoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleEliminarFoto = () => {
    setPreviewFoto(null);
    setFormData((p) => ({ ...p, fotoUrl: "image.png" }));
  };

  const handleVideoFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      return;
    }

    if (!file.type.startsWith("video/")) {
      // El error se manejará por el estado del hook
      return;
    }

    setVideoFile(file);
    // Limpiar cualquier error anterior
  };

  // ============================================================
  // SUBIR VIDEO A CLOUDINARY (MVP / upload_preset)
  // ============================================================
  async function uploadVideoToCloudinary(file: File): Promise<CloudinaryResponse> {
    const fd = new FormData();
    fd.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data: CloudinaryResponse = await uploadRes.json();

    if (!uploadRes.ok) {
      setFormError("Error al subir el video a Cloudinary");
      throw new Error("Error subiendo video");
    }

    return data;
  }

  // Función para subir archivos
  const subirArchivo = async (file: File, tipo: "imagen" | "video") => {
    try {
      setSubiendoArchivo(true);
      console.log(` Subiendo ${tipo}:`, file.name);
      console.log(` Tipo de archivo:`, file.type);
      console.log(` Tamaño:`, (file.size / 1024 / 1024).toFixed(2), "MB");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tipo", tipo); // ← Asegurarse que esto esté correcto

      console.log(` Enviando a /api/upload con tipo="${tipo}"`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(` Error del servidor:`, errorData);
        throw new Error(errorData.error || "Error al subir archivo");
      }

      const data = await response.json();
      console.log(` ${tipo} subido:`, data.url);

      if (tipo === "imagen") {
        setImagenUrl(data.url);
        setImagenPublicId(data.publicId);
      } else {
        setVideoUrl(data.url);
        setVideoPublicId(data.publicId);
      }

      return data.url;
    } catch (error) {
      console.error(` Error al subir ${tipo}:`, error);
      setFormError(error instanceof Error ? error.message : `Error al subir ${tipo}`);
      return null;
    } finally {
      setSubiendoArchivo(false);
    }
  };

  // ============================================================
  // SUBMIT
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setFormError(null);

    try {
      // Validaciones básicas
      if (formulario.pedirNombre && !formData.nombreCompleto.trim()) {
        throw new Error("El nombre es requerido");
      }

      if (formulario.pedirCorreo && !formData.correo.trim()) {
        throw new Error("El correo es requerido");
      }

      // ELIMINAR validación de título ↓
      // if (!formData.titulo.trim()) {
      //   throw new Error("El título es requerido");
      // }

      // Validar según el formato permitido
      const tieneTexto = formData.texto.trim().length > 0;
      const tieneImagen = imagenUrl.length > 0;
      const tieneVideo = videoUrl.length > 0;

      // Si SOLO permite texto, el texto es obligatorio
      if (formulario.permitirTexto && !formulario.permitirTextoImagen && !formulario.permitirVideo) {
        if (!tieneTexto) {
          throw new Error("El texto del testimonio es requerido");
        }
      }

      // Si permite texto + imagen, debe tener al menos uno
      if (formulario.permitirTextoImagen && !formulario.permitirVideo) {
        if (!tieneTexto && !tieneImagen) {
          throw new Error("Debes proporcionar texto o una imagen");
        }
      }

      // Si permite video, el video es obligatorio SOLO si no permite otras opciones
      if (formulario.permitirVideo && !formulario.permitirTexto && !formulario.permitirTextoImagen) {
        if (!tieneVideo) {
          throw new Error("Debes subir un video");
        }
      }

      // Si permite múltiples formatos, debe tener al menos uno
      if ((formulario.permitirTexto || formulario.permitirTextoImagen || formulario.permitirVideo)) {
        if (!tieneTexto && !tieneImagen && !tieneVideo) {
          throw new Error("Debes proporcionar al menos un contenido (texto, imagen o video)");
        }
      }

      // Validar preguntas requeridas
      for (const pregunta of formulario.preguntas || []) {
        if (pregunta.requerida && !formData.respuestas[pregunta.id]) {
          throw new Error(`La pregunta "${pregunta.texto}" es requerida`);
        }
      }

      const response = await fetch("/api/respuestas-formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formularioId: formulario.id,
          organizacionId: formulario.organizacionId,
          nombreCompleto: formData.nombreCompleto.trim() || null,
          correo: formData.correo.trim() || null,
          titulo: "Testimonio sin título", // ← Valor por defecto
          texto: formData.texto.trim() || null,
          calificacion: formData.calificacion || 5,
          imagenUrl: imagenUrl || null,
          videoUrl: videoUrl || null,
          imagenPublicId: imagenPublicId || null,
          videoPublicId: videoPublicId || null,
          respuestas: formData.respuestas,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar el testimonio");
      }

      const data = await response.json();

      // Mostrar mensaje de éxito
      setExito(true);

      // Limpiar formulario
      setFormData({
        nombreCompleto: "",
        correo: "",
        texto: "",
        calificacion: 5,
        fotoUrl: "image.png",
        respuestas: {},
      });

      setVideoFile(null);
      setPreviewFoto(null);
      setCloudinaryVideo(null);
      setImagenUrl("");
      setVideoUrl("");
      setImagenPublicId("");
      setVideoPublicId("");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Error al enviar el testimonio"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setEnviando(false);
    }
  };

  // ============================================================
  // UI LOADING & ERROR
  // ============================================================
 if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin" />
    </div>
  );
  if (isError)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h1 className="text-xl font-bold">Error al cargar el formulario</h1>
      <p>{errorMessage || "No se pudo cargar el formulario. Por favor, inténtalo de nuevo."}</p>
    </div>
  );

  if (!formulario)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold">Formulario no encontrado</h1>
        <p>{errorMessage || "Error desconocido"}</p>
      </div>
    );

  // ============================================================
  // LÓGICA FORMATO
  // ============================================================
  const soloTexto =
    formulario.permitirTexto &&
    !formulario.permitirTextoImagen &&
    !formulario.permitirVideo;

  const soloVideo =
    formulario.permitirVideo &&
    !formulario.permitirTexto &&
    !formulario.permitirTextoImagen;

  const permiteTexto =
    formulario.permitirTexto || formulario.permitirTextoImagen;

  // LÓGICA: ¿Mostrar preguntas adicionales?
  // Solo si es texto o texto+imagen (NO si es solo video)
  const mostrarPreguntas =
    (formulario.permitirTexto || formulario.permitirTextoImagen) &&
    !formulario.permitirVideo;

  const formatoEtiqueta = soloVideo
    ? "Video"
    : soloTexto
      ? "Texto"
      : "Flexible";

  const formatoDescripcion = soloVideo
    ? "Comparte un video y un breve resumen."
    : soloTexto
      ? "Escribe tu testimonio."
      : "Completa preguntas y/o agrega imagen.";

  //===============================================================
  //Verificacion del estado del formulario del testimonio
  //===============================================================
  if (formulario.estado !== "publicado") {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Formulario no disponible
        </h2>
        <p className="text-gray-600">
          Este formulario no está disponible actualmente.
        </p>
      </div>
    </div>
  );
}

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-8 bg-indigo-600 text-white">
          <h1 className="text-3xl font-bold">
            {formulario.nombreFormulario}
          </h1>
          <p className="opacity-70">{formulario.descripcion}</p>
        </div>

        {/* FORMATO INFO */}
        <div className="px-6 py-5 bg-slate-50 border-b">
          <p className="text-xs uppercase text-slate-500">
            Formato: {formatoEtiqueta}
          </p>
          <p className="text-sm text-slate-600">{formatoDescripcion}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* UI mensajes */}
          {exito && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-3">
              <CheckCircle className="text-green-600" />
              <p>{formulario.mensajeGracias}</p>
            </div>
          )}

          {(errorMessage || formError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 shrink-0" />
              <p className="text-sm">{errorMessage || formError}</p>
            </div>
          )}

          {/* FOTO PERFIL */}
          {formulario.permitirTextoImagen && (
            <div>
              <label className="font-medium text-sm">Foto opcional</label>
              <div className="flex items-center gap-4 mt-2">
                {previewFoto ? (
                  <div className="relative">
                    <img
                      src={previewFoto}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <button
                      type="button"
                      onClick={handleEliminarFoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <Upload className="text-gray-400" />
                  </div>
                )}

                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFotoChange}
                  />
                  <div className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100">
                    {previewFoto ? "Cambiar Foto" : "Subir Foto"}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* NOMBRE */}
          {formulario.pedirNombre && (
            <div>
              <label className="font-medium text-sm">
                Nombre Completo
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>
          )}

          {/* CORREO */}
          {formulario.pedirCorreo && (
            <div>
              <label className="font-medium text-sm">
                Correo electrónico
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>
          )}

          {/* ELIMINAR COMPLETAMENTE EL CAMPO DE TÍTULO */}

          {/* TEXTO / RESUMEN */}
          <div className="space-y-2">
            <label className="font-medium text-sm">
              {soloVideo ? "Resumen del Video" : "Testimonio"}
              <span className="text-red-500 ml-1">*</span>
            </label>

            <Textarea
              name="texto"
              value={formData.texto}
              rows={soloVideo ? 3 : 5}
              onChange={handleInputChange}
              placeholder={
                soloVideo
                  ? "Escribe un breve resumen del video..."
                  : "Comparte tu experiencia..."
              }
              required={permiteTexto}
            />
          </div>

          {/* CALIFICACIÓN */}
          <div>
            <label className="font-medium text-sm">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl ${formData.calificacion >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                  onClick={() =>
                    setFormData((p) => ({ ...p, calificacion: star }))
                  }
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* IMAGEN */}
          {formulario.permitirTextoImagen && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Imagen
                {!formulario.permitirTexto && !formulario.permitirVideo && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    await subirArchivo(file, "imagen");
                  }
                }}
                disabled={subiendoArchivo}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-brand-blue file:text-white
                  hover:file:bg-brand-blue/90
                  disabled:opacity-50 disabled:cursor-not-allowed
                  cursor-pointer"
              />
              <p className="text-xs text-slate-500">
                JPG, PNG, GIF, WEBP. Máximo 10MB.
              </p>
              {imagenUrl && (
                <div className="relative mt-3">
                  <img
                    src={imagenUrl}
                    alt="Vista previa"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagenUrl("");
                      setImagenPublicId("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VIDEO */}
          {formulario.permitirVideo && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Video
                {!formulario.permitirTexto && !formulario.permitirTextoImagen && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    await subirArchivo(file, "video");
                  }
                }}
                disabled={subiendoArchivo}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-brand-blue file:text-white
                  hover:file:bg-brand-blue/90
                  disabled:opacity-50 disabled:cursor-not-allowed
                  cursor-pointer"
              />
              <p className="text-xs text-slate-500">
                MP4, WEBM, MOV. Máximo 100MB.
              </p>
              {videoUrl && (
                <div className="relative mt-3">
                  <video
                    src={videoUrl}
                    controls
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrl("");
                      setVideoPublicId("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PREGUNTAS DINÁMICAS - SOLO SI ES TEXTO O TEXTO+IMAGEN */}
          {mostrarPreguntas && formulario.preguntas && formulario.preguntas.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900">
                Preguntas adicionales
              </h3>

              {formulario.preguntas.map((p) => (
                <div key={p.id}>
                  <label className="block text-sm font-medium mb-1">
                    {p.titulo}
                    {p.requerida && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>

                  {p.tipo === "texto" && (
                    <Input
                      value={formData.respuestas[p.id] || ""}
                      onChange={(e) =>
                        handlePreguntaChange(p.id, e.target.value)
                      }
                      required={p.requerida}
                      placeholder="Tu respuesta..."
                    />
                  )}

                  {p.tipo === "opcion_unica" && (
                    <div className="space-y-2">
                      {p.opciones?.map((opcion: string, idx: number) => (
                        <label key={idx} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-slate-50">
                          <input
                            type="radio"
                            name={`pregunta-${p.id}`}
                            value={opcion}
                            checked={formData.respuestas[p.id] === opcion}
                            onChange={(e) => handlePreguntaChange(p.id, e.target.value)}
                            required={p.requerida}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{opcion}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {p.tipo === "opcion_multiple" && (
                    <div className="space-y-2">
                      {p.opciones?.map((opcion: string, idx: number) => {
                        const seleccionadas = formData.respuestas[p.id] || [];
                        return (
                          <label key={idx} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-slate-50">
                            <input
                              type="checkbox"
                              value={opcion}
                              checked={seleccionadas.includes(opcion)}
                              onChange={(e) => {
                                const nuevas = e.target.checked
                                  ? [...seleccionadas, opcion]
                                  : seleccionadas.filter((o: string) => o !== opcion);
                                handlePreguntaChange(p.id, nuevas);
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">{opcion}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {p.tipo === "escala" && (
                    <div className="flex gap-2 items-center justify-center py-2">
                      <span className="text-xs text-slate-500">{p.minimo || 1}</span>
                      {Array.from({ length: (p.maximo || 5) - (p.minimo || 1) + 1 }, (_, i) => i + (p.minimo || 1)).map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handlePreguntaChange(p.id, num)}
                          className={`w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                            formData.respuestas[p.id] === num
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <span className="text-xs text-slate-500">{p.maximo || 5}</span>
                    </div>
                  )}

                  {p.tipo === "fecha" && (
                    <Input
                      type="date"
                      value={formData.respuestas[p.id] || ""}
                      onChange={(e) => handlePreguntaChange(p.id, e.target.value)}
                      required={p.requerida}
                    />
                  )}

                  {p.tipo === "archivo" && (
                    <div>
                      <Input
                        type="file"
                        accept={p.formatoArchivo === "imagen" ? "image/*" : p.formatoArchivo === "video" ? "video/*" : "*/*"}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handlePreguntaChange(p.id, file.name);
                          }
                        }}
                        required={p.requerida}
                      />
                      {formData.respuestas[p.id] && (
                        <p className="text-xs text-slate-500 mt-1">Archivo: {formData.respuestas[p.id]}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* BOTÓN ENVIAR */}
          <button
            type="submit"
            disabled={enviando || subiendoArchivo}
            className="w-full bg-brand-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {enviando ? "Enviando..." : subiendoArchivo ? "Subiendo archivo..." : "Enviar Testimonio"}
          </button>
        </form>
      </div>
    </div>
  );
}
