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
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState<string>("");
  const [fotoPerfilPublicId, setFotoPerfilPublicId] = useState<string>("");
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
    fotoFile: "image.png",
    respuestas: {} as Record<string, any>,
  });

  const [previewFotoPerfil, setPreviewFotoPerfil] = useState<string | null>(null);
  const [previewImagenPrincipal, setPreviewImagenPrincipal] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [fotoPerfilFile, setFotoPerfilFile] = useState<File | null>(null);
  const [imagenPrincipalFile, setImagenPrincipalFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
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

  const handleFotoPerfilChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Por favor selecciona una imagen válida");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("La imagen no debe superar 5MB");
      return;
    }

    // Solo preview local, NO subir aún
    setFotoPerfilFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFotoPerfil(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEliminarFotoPerfil = () => {
    setPreviewFotoPerfil(null);
    setFotoPerfilFile(null);
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
      console.log(`📤 Subiendo ${tipo}:`, file.name);
      console.log(`   Tipo de archivo:`, file.type);
      console.log(`   Tamaño:`, (file.size / 1024 / 1024).toFixed(2), "MB");

      const formData = new FormData();
      formData.append("file", file);
      // No enviamos "tipo" porque el servidor lo detecta automáticamente

      console.log(`📡 Enviando a /api/upload...`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log(`📥 Respuesta del servidor:`, response.status, response.statusText);

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error("No se pudo parsear la respuesta de error:", parseError);
          errorData = { error: "Error desconocido del servidor" };
        }
        console.error(`❌ Error del servidor:`, errorData);

        const errorMessage = errorData.details || errorData.error || "Error al subir archivo";
        setFormError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`✅ ${tipo} subido exitosamente:`, data.url);

      if (tipo === "imagen") {
        setImagenUrl(data.url);
        setImagenPublicId(data.publicId);
      } else {
        setVideoUrl(data.url);
        setVideoPublicId(data.publicId);
      }

      return data.url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Error al subir ${tipo}`;
      console.error(`❌ Error al subir ${tipo}:`, errorMessage);
      setFormError(errorMessage);
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
      const tienePreguntas = formulario.preguntas && formulario.preguntas.length > 0;

      // Si SOLO permite video, el video es obligatorio
      if (formulario.permitirVideo && !formulario.permitirTexto && !formulario.permitirTextoImagen) {
        if (!tieneVideo) {
          throw new Error("Debes subir un video");
        }
      }

      // Si permite texto o texto+imagen (pero tiene preguntas), no requiere el campo de texto general
      // Solo valida las preguntas requeridas más abajo
      if (!tienePreguntas) {
        // Si NO hay preguntas configuradas, entonces sí requerir contenido
        if (formulario.permitirTexto && !formulario.permitirTextoImagen && !formulario.permitirVideo) {
          if (!tieneTexto) {
            throw new Error("El testimonio es requerido");
          }
        }

        // Si permite texto + imagen, debe tener al menos uno
        if (formulario.permitirTextoImagen && !formulario.permitirVideo) {
          if (!tieneTexto && !tieneImagen) {
            throw new Error("Debes proporcionar texto o una imagen");
          }
        }
      }

      // Validar preguntas requeridas
      for (const pregunta of formulario.preguntas || []) {
        if (pregunta.requerida && !formData.respuestas[pregunta.id]) {
          throw new Error(`La pregunta "${pregunta.texto}" es requerida`);
        }
      }

      // SUBIR ARCHIVOS A CLOUDINARY AHORA
      let urlFotoPerfil: string | null = null;
      let publicIdFotoPerfil: string | null = null;
      let urlImagenPrincipal: string | null = null;
      let publicIdImagenPrincipal: string | null = null;
      let urlVideo: string | null = null;
      let publicIdVideo: string | null = null;

      // Subir foto de perfil si existe
      if (fotoPerfilFile) {
        urlFotoPerfil = await subirArchivo(fotoPerfilFile, "imagen");
      }

      // Subir imagen principal si existe
      if (imagenPrincipalFile) {
        urlImagenPrincipal = await subirArchivo(imagenPrincipalFile, "imagen");
      }

      // Subir video si existe
      if (videoFile) {
        urlVideo = await subirArchivo(videoFile, "video");
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
          texto: formData.texto.trim() || null,
          calificacion: formData.calificacion || 5,
          fotoPerfilUrl: urlFotoPerfil, // Foto de perfil
          imagenUrl: urlImagenPrincipal, // Imagen principal
          videoUrl: urlVideo,
          fotoPerfilPublicId: publicIdFotoPerfil,
          imagenPublicId: publicIdImagenPrincipal,
          videoPublicId: publicIdVideo,
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
        fotoFile: "image.png",
        respuestas: {},
      });

      setVideoFile(null);
      setFotoPerfilFile(null);
      setImagenPrincipalFile(null);
      setPreviewFotoPerfil(null);
      setPreviewImagenPrincipal(null);
      setVideoPreview(null);
      setCloudinaryVideo(null);
      setFotoPerfilUrl("");
      setFotoPerfilPublicId("");
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
  // Mostrar preguntas si permite texto o texto+imagen
  const mostrarPreguntas =
    formulario.permitirTexto || formulario.permitirTextoImagen;

  const formatoEtiqueta = soloVideo
    ? "Video"
    : soloTexto
      ? "Texto"
      : formulario.permitirTextoImagen && formulario.permitirVideo
        ? "Multimedia"
        : formulario.permitirTextoImagen
          ? "Texto e Imagen"
          : "Flexible";

  const formatoDescripcion = soloVideo
    ? "Comparte un video con tu testimonio."
    : soloTexto
      ? "Escribe tu testimonio en texto."
      : formulario.permitirTextoImagen && formulario.permitirVideo
        ? "Puedes compartir texto, imagen o video."
        : formulario.permitirTextoImagen
          ? "Comparte tu testimonio con texto y/o imagen."
          : "Comparte tu experiencia.";

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
    throw new Error("Function not implemented.");
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

          {/* FOTO PERFIL (Avatar circular) */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Foto de Perfil (opcional)
            </label>
            <p className="text-xs text-slate-500">Esta será tu foto de perfil (avatar circular)</p>

            <div className="flex items-center gap-4">
              {previewFotoPerfil ? (
                <div className="relative">
                  <img
                    src={previewFotoPerfil}
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-300"
                    alt="Foto de perfil"
                  />
                  <button
                    type="button"
                    onClick={handleEliminarFotoPerfil}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <Upload className="text-slate-400 w-6 h-6" />
                </div>
              )}

              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFotoPerfilChange}
                />
                <div className="px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-sm font-medium transition-colors">
                  {previewFotoPerfil ? "Cambiar Foto" : "Seleccionar Foto"}
                </div>
              </label>
            </div>
          </div>          {/* NOMBRE */}
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

          {/* CAJA DE TEXTO PRINCIPAL - Para formatos de texto o texto+imagen */}
          {(formulario.permitirTexto || formulario.permitirTextoImagen) && (
            <div className="space-y-2">
              <label className="font-medium text-sm flex items-center gap-2">
                Comparte tu testimonio
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                name="texto"
                value={formData.texto}
                rows={6}
                onChange={handleInputChange}
                placeholder="Escribe aquí tu testimonio..."
                required
                className="resize-none"
              />
              <p className="text-xs text-slate-500">
                Comparte tu experiencia de manera detallada
              </p>
            </div>
          )}

          {/* TEXTO / RESUMEN - Solo mostrar si permite video */}
          {formulario.permitirVideo && (
            <div className="space-y-2">
              <label className="font-medium text-sm">
                Descripción del Video
                {(soloVideo && !formulario.permitirTextoImagen) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              <Textarea
                name="texto"
                value={formData.texto}
                rows={3}
                onChange={handleInputChange}
                placeholder="Describe brevemente lo que compartes en el video..."
                required={soloVideo && !formulario.permitirTextoImagen}
                className="resize-none"
              />
            </div>
          )}

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



          {/* IMAGEN PRINCIPAL */}
          {formulario.permitirTextoImagen && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Sube una imagen que ilustre tu testimonio
                {!formulario.permitirTexto && !formulario.permitirVideo && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImagenPrincipalFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewImagenPrincipal(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-700
                  cursor-pointer"
              />

              {previewImagenPrincipal && (
                <div className="relative mt-3">
                  <img
                    src={previewImagenPrincipal}
                    alt="Vista previa de la imagen"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImagenPrincipal(null);
                      setImagenPrincipalFile(null);
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
                Video del Testimonio
                {!formulario.permitirTexto && !formulario.permitirTextoImagen && (
                  <span className="text-red-500"> *</span>
                )}
              </label>

              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setVideoFile(file);
                    setVideoPreview(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-700
                  cursor-pointer"
              />

              {videoPreview && (
                <div className="relative mt-3">
                  <video
                    src={videoPreview}
                    controls
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setVideoPreview(null);
                      setVideoFile(null);
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
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900">
                Preguntas adicionales
              </h3>

              {formulario.preguntas.map((p, index) => (
                <div key={p.id} className="space-y-3 p-4 bg-slate-50 rounded-lg">
                  <label className="block text-base font-semibold text-slate-900">
                    {index + 1}. {p.texto}
                    {p.requerida && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {/* TEXTO CORTO */}
                  {p.tipo === "texto" && (
                    <Input
                      value={formData.respuestas[p.id] || ""}
                      onChange={(e) =>
                        handlePreguntaChange(p.id, e.target.value)
                      }
                      required={p.requerida}
                      placeholder="Tu respuesta..."
                      className="w-full"
                    />
                  )}

                  {/* OPCIÓN ÚNICA (RADIO) */}
                  {p.tipo === "opcion_unica" && (
                    <div className="flex flex-wrap gap-2">
                      {(typeof p.opciones === 'string' ? JSON.parse(p.opciones) : p.opciones || []).map((opcion: string, idx: number) => (
                        <label
                          key={idx}
                          className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${formData.respuestas[p.id] === opcion
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400"
                            }`}
                        >
                          <input
                            type="radio"
                            name={`pregunta-${p.id}`}
                            value={opcion}
                            checked={formData.respuestas[p.id] === opcion}
                            onChange={(e) => handlePreguntaChange(p.id, e.target.value)}
                            required={p.requerida}
                            className="w-4 h-4"
                          />
                          <span className="font-medium">{opcion}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* OPCIÓN MÚLTIPLE (CHECKBOX) */}
                  {p.tipo === "opcion_multiple" && (
                    <div className="space-y-2">
                      {(typeof p.opciones === 'string' ? JSON.parse(p.opciones) : p.opciones || []).map((opcion: string, idx: number) => {
                        const seleccionadas = formData.respuestas[p.id] || [];
                        return (
                          <label
                            key={idx}
                            className="flex items-center gap-3 p-3 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                          >
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
                              className="w-5 h-5 text-indigo-600"
                            />
                            <span className="text-sm font-medium text-slate-700">
                              {opcion}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* ESCALA (NÚMEROS) */}
                  {p.tipo === "escala" && (
                    <div className="flex flex-wrap gap-2 items-center justify-start">
                      <span className="text-xs text-slate-500 font-medium mr-2">
                        {p.minimo || 1}
                      </span>
                      {Array.from(
                        {
                          length:
                            (p.maximo || 5) - (p.minimo || 1) + 1,
                        },
                        (_, i) => i + (p.minimo || 1)
                      ).map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handlePreguntaChange(p.id, num)}
                          className={`w-12 h-12 rounded-full border-2 font-bold transition-all ${formData.respuestas[p.id] === num
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400"
                            }`}
                        >
                          {num}
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 font-medium ml-2">
                        {p.maximo || 5}
                      </span>
                    </div>
                  )}

                  {/* FECHA */}
                  {p.tipo === "fecha" && (
                    <Input
                      type="date"
                      value={formData.respuestas[p.id] || ""}
                      onChange={(e) => handlePreguntaChange(p.id, e.target.value)}
                      required={p.requerida}
                      className="w-full"
                    />
                  )}

                  {/* ARCHIVO MEJORADO */}
                  {p.tipo === "archivo" && (
                    <label className="block cursor-pointer">
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${formData.respuestas[p.id]
                          ? "border-green-500 bg-green-50"
                          : "border-slate-300 hover:border-indigo-500 hover:bg-indigo-50"
                          }`}
                      >
                        <svg
                          className="mx-auto h-10 w-10 mb-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-12l6 6m0 0l-6 6m6-6H8"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="font-semibold text-slate-700">
                          {formData.respuestas[p.id]
                            ? `Archivo: ${formData.respuestas[p.id]}`
                            : "Haz clic para seleccionar archivo"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {p.formatoArchivo === "imagen"
                            ? "PNG, JPG, GIF hasta 10MB"
                            : p.formatoArchivo === "video"
                              ? "MP4, WebM hasta 100MB"
                              : "Cualquier formato hasta 50MB"}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept={
                          p.formatoArchivo === "imagen"
                            ? "image/*"
                            : p.formatoArchivo === "video"
                              ? "video/*"
                              : "*/*"
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handlePreguntaChange(p.id, file.name);
                          }
                        }}
                        required={p.requerida}
                        className="hidden"
                      />
                    </label>
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
