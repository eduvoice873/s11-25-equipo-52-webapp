"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Settings,
  MessageSquare,
  Share2,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
  FileText,
  Video,
  Check,
  X,
} from "lucide-react";
import { Switch } from "@radix-ui/react-switch";
import { Input } from "@/components/ui/input";
import { useTestimonio } from "@/hooks/swr/useTestimonio";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Tipos y definicios
// Debe coincidir con el enum en prisma/schema.prisma
type ModalidadTestimonio = "texto_imagen" | "video";
type TipoPregunta =
  | "texto"
  | "opcion_unica"
  | "opcion_multiple"
  | "escala"
  | "fecha"
  | "archivo";

interface Pregunta {
  id: string;
  texto: string;
  tipo: TipoPregunta;
  requerida: boolean;
  opciones?: string[];
  minimo?: number;
  maximo?: number;
  formatoArchivo?: string;
}

// Pasos del formulario
type Step = 1 | 2 | 3 | 4;

const STEPS = [
  {
    number: 1,
    title: "Información",
    icon: Sparkles,
    description: "Configura los datos básicos",
  },
  {
    number: 2,
    title: "Formatos",
    icon: Settings,
    description: "Selecciona tipos de respuesta",
  },
  {
    number: 3,
    title: "Contenido",
    icon: MessageSquare,
    description: "Configura el contenido",
  },
  {
    number: 4,
    title: "Publicar",
    icon: Share2,
    description: "Comparte tu formulario",
  },
];

const formSchema = z.object({
  titulo: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  pedirNombre: z.boolean().default(true),
  pedirCorreo: z.boolean().default(true),
  permitirTexto: z.boolean().default(true),
  permitirTextoImagen: z.boolean().default(false),
  permitirVideo: z.boolean().default(false),
  mensajeGracias: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
  urlVolverAlInicio: z.string().optional(),
  slugPublico: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .regex(
      /^[a-z0-9-]+$/,
      "Solo se permiten letras minúsculas, números y guiones"
    ),
  estado: z.enum(["borrador", "publicado"]).default("borrador"),
  preguntas: z
    .array(
      z.object({
        id: z.string(),
        texto: z.string().min(3, "La pregunta debe tener al menos 3 caracteres"),
        tipo: z.enum([
          "texto",
          "opcion_unica",
          "opcion_multiple",
          "escala",
          "fecha",
          "archivo",
        ]),
        requerida: z.boolean().default(true),
        opciones: z.array(z.string()).optional(),
        minimo: z.number().optional(),
        maximo: z.number().optional(),
        formatoArchivo: z.string().optional(),
      })
    )
    .default([]),
});

type FormValues = z.infer<typeof formSchema>;

const formatoEtiquetas: Record<TipoPregunta, string> = {
  texto: "Texto",
  opcion_unica: "Opción única",
  opcion_multiple: "Opción múltiple",
  escala: "Escala",
  fecha: "Fecha",
  archivo: "Archivo",
};

interface TestimonioFormProps {
  categoriaId: string;
  testimonioExistente?: any;
  onSuccess?: () => void;
}

export default function NuevoFormularioTestimonioPage({
  categoriaId,
  testimonioExistente,
  onSuccess,
}: TestimonioFormProps) {
  const router = useRouter();
  const { crearTestimonio, actualizarTestimonio, isLoading } = useTestimonio();

  const defaultFormValues = testimonioExistente
    ? { ...testimonioExistente, preguntas: testimonioExistente.preguntas ?? [] }
    : {
      titulo: "",
      descripcion:
        "Comparte tu experiencia con nosotros. Tu opinión es muy importante.",
      pedirNombre: true,
      pedirCorreo: true,
      permitirTexto: true,
      permitirTextoImagen: false,
      permitirVideo: false,
      mensajeGracias:
        "¡Gracias por compartir tu experiencia! Tu testimonio nos ayuda a mejorar.",
      urlVolverAlInicio: "",
      slugPublico: "",
      estado: "borrador",
      nombreAutor: null,
      correoAutor: null,
      modalidad: "texto",
      destacado: false,
      calificacion: 5,
      preguntas: [],
    };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: defaultFormValues,
  });

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [preguntas, setPreguntas] = useState<Pregunta[]>(
    defaultFormValues.preguntas || []
  );

  const permitirTexto = form.watch("permitirTexto");
  const permitirTextoImagen = form.watch("permitirTextoImagen");
  const permitirVideo = form.watch("permitirVideo");

  const syncPreguntas = (nuevas: Pregunta[]) => {
    setPreguntas(nuevas);
    form.setValue("preguntas", nuevas);
  };

  const agregarPregunta = (tipo: TipoPregunta) => {
    const nuevaPregunta: Pregunta = {
      id: Math.random().toString(36).substr(2, 9),
      texto: "",
      tipo,
      requerida: true,
    };

    if (tipo === "opcion_unica" || tipo === "opcion_multiple") {
      nuevaPregunta.opciones = ["Opción 1", "Opción 2"];
    } else if (tipo === "escala") {
      nuevaPregunta.minimo = 1;
      nuevaPregunta.maximo = 5;
    } else if (tipo === "archivo") {
      nuevaPregunta.formatoArchivo = "imagen";
    }

    syncPreguntas([...preguntas, nuevaPregunta]);
  };

  const actualizarPregunta = (id: string, cambios: Partial<Pregunta>) => {
    syncPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === id ? { ...pregunta, ...cambios } : pregunta
      )
    );
  };

  const eliminarPregunta = (id: string) => {
    syncPreguntas(preguntas.filter((pregunta) => pregunta.id !== id));
  };

  const moverPregunta = (id: string, direccion: "arriba" | "abajo") => {
    const index = preguntas.findIndex((p) => p.id === id);
    if (index === -1) return;

    const nuevaLista = [...preguntas];
    const temp = nuevaLista[index];

    if (direccion === "arriba" && index > 0) {
      nuevaLista[index] = nuevaLista[index - 1];
      nuevaLista[index - 1] = temp;
    } else if (direccion === "abajo" && index < nuevaLista.length - 1) {
      nuevaLista[index] = nuevaLista[index + 1];
      nuevaLista[index + 1] = temp;
    }

    syncPreguntas(nuevaLista);
  };

  // Limpiar preguntas automáticamente cuando el formulario queda en modo SOLO VIDEO
  useEffect(() => {
    const esSoloVideo =
      permitirVideo && !permitirTexto && !permitirTextoImagen;

    if (esSoloVideo && preguntas.length > 0) {
      syncPreguntas([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permitirVideo, permitirTexto, permitirTextoImagen]);

  // Obtener el origen para construir URLs
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Generar slug automáticamente basado en el título
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === "titulo" &&
        value.titulo &&
        !form.formState.touchedFields.slugPublico
      ) {
        const slug = slugify(value.titulo);
        form.setValue("slugPublico", slug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const isEditMode = !!testimonioExistente;
  const publicUrl = `${origin}/f/${form.watch("slugPublico") || "mi-formulario"
    }`;

  // Navegación entre pasos
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as Step);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Validación de pasos
  const validateStep = (step: Step): boolean => {
    const values = form.getValues();
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!values.titulo?.trim()) errors.titulo = "El título es requerido";
      if (!values.descripcion?.trim())
        errors.descripcion = "La descripción es requerida";
    }

    if (step === 2) {
      if (
        !values.permitirTexto &&
        !values.permitirTextoImagen &&
        !values.permitirVideo
      ) {
        errors.formatos = "Debes seleccionar al menos un formato de respuesta";
      }
    }

    if (step === 4) {
      if (!values.slugPublico)
        errors.slugPublico = "El slug de la URL es requerido";
    }

    // Mostrar errores
    Object.entries(errors).forEach(([key, message]) => {
      form.setError(key as any, { message });
    });

    return Object.keys(errors).length === 0;
  };

  // Enviar formulario
  const onSubmit = async (values: FormValues) => {
    try {
      // Determinar la modalidad basada en los formatos permitidos
      // Según el esquema de Prisma, las opciones son 'texto_imagen' o 'video'
      let modalidad: 'texto_imagen' | 'video' = 'texto_imagen';
      if (values.permitirVideo) {
        modalidad = 'video';
      }

      const testimonioData = {
        ...values,
        categoriaId,
        personaId: "", // TODO: Obtener el ID del usuario autenticado
        modalidad,
        texto: values.descripcion,
        destacado: (values as any).destacado || false,
        estado: values.estado,
        calificacion: (values as any).calificacion || 5,
        publicadoEn: values.estado === "publicado" ? new Date() : null,
        creadoEn: testimonioExistente?.creadoEn || new Date(),
        actualizadoEn: new Date(),
        actualizadoPorId: "", // TODO: Obtener el ID del usuario actual
        nombreAutor: (values as any).pedirNombre
          ? (values as any).nombreAutor || null
          : null,
        correoAutor: (values as any).pedirCorreo
          ? (values as any).correoAutor || null
          : null,
        slugPublico: values.slugPublico.toLowerCase(),
      };

      if (isEditMode) {
        await actualizarTestimonio(testimonioExistente.id, testimonioData);
        toast.success("Testimonio actualizado correctamente");
      } else {
        await crearTestimonio(testimonioData as any);
        toast.success("Testimonio creado correctamente");
      }

      onSuccess?.();
      router.push(`/categorias/${categoriaId}`);
    } catch (error: any) {
      console.error("Error al guardar el testimonio:", error);
      toast.error(
        error?.message || "Ocurrió un error al guardar el testimonio"
      );
    }
  };

  // Copiar al portapapeles
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("No se pudo copiar el enlace");
    }
  };

  const renderTipoPregunta = (pregunta: Pregunta) => {
    const opciones = pregunta.opciones ?? [];

    const handleAgregarOpcion = () => {
      const nuevaOpcion = `Opción ${opciones.length + 1}`;
      actualizarPregunta(pregunta.id, { opciones: [...opciones, nuevaOpcion] });
    };

    const handleActualizarOpcion = (index: number, valor: string) => {
      const nuevasOpciones = opciones.map((opcion, idx) =>
        idx === index ? valor : opcion
      );
      actualizarPregunta(pregunta.id, { opciones: nuevasOpciones });
    };

    const handleEliminarOpcion = (index: number) => {
      const nuevasOpciones = opciones.filter((_, idx) => idx !== index);
      if (nuevasOpciones.length === 0) {
        nuevasOpciones.push("Opción 1");
      }
      actualizarPregunta(pregunta.id, { opciones: nuevasOpciones });
    };

    const minimo = pregunta.minimo ?? 1;
    const maximo = pregunta.maximo ?? 5;

    switch (pregunta.tipo) {
      case "texto":
        return (
          <p className="text-sm text-slate-500">
            Respuesta abierta de texto.
          </p>
        );

      case "opcion_unica":
      case "opcion_multiple":
        return (
          <div className="space-y-2">
            {opciones.map((opcion, index) => (
              <div
                key={`${pregunta.id}-opcion-${index}`}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={opcion}
                  onChange={(event) =>
                    handleActualizarOpcion(index, event.target.value)
                  }
                  className="flex-1 rounded border border-slate-200 px-2 py-1 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleEliminarOpcion(index)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAgregarOpcion}
              className="inline-flex items-center rounded text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar opción
            </button>
          </div>
        );

      case "escala":
        return (
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="font-medium">Rango:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={minimo}
                onChange={(event) =>
                  actualizarPregunta(pregunta.id, {
                    minimo: Number(event.target.value) || 1,
                  })
                }
                className="w-16 rounded border border-slate-200 px-2 py-1 text-sm"
              />
              <span>al</span>
              <input
                type="number"
                min={minimo}
                value={maximo}
                onChange={(event) =>
                  actualizarPregunta(pregunta.id, {
                    maximo: Number(event.target.value) || minimo,
                  })
                }
                className="w-16 rounded border border-slate-200 px-2 py-1 text-sm"
              />
            </div>
          </div>
        );

      case "fecha":
        return (
          <p className="text-sm text-slate-500">
            Permite seleccionar una fecha.
          </p>
        );

      case "archivo":
        return (
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <ImageIcon className="w-4 h-4 text-blue-500" />
            <select
              value={pregunta.formatoArchivo || "imagen"}
              onChange={(event) =>
                actualizarPregunta(pregunta.id, {
                  formatoArchivo: event.target.value,
                })
              }
              className="rounded border border-slate-200 bg-white px-2 py-1 text-sm"
            >
              <option value="imagen">Imagen</option>
              <option value="documento">Documento</option>
              <option value="video">Video</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const renderVistaPreviaPregunta = (pregunta: Pregunta) => {
    const minimo = pregunta.minimo ?? 1;
    const maximo = pregunta.maximo ?? 5;
    const pasos = Math.max(1, maximo - minimo + 1);

    switch (pregunta.tipo) {
      case "texto":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FileText className="w-4 h-4" />
              <span>Respuesta corta</span>
            </div>
            <input
              disabled
              placeholder="Respuesta de texto"
              className="w-full rounded border border-slate-200 px-3 py-2 text-sm text-slate-600 bg-slate-50"
            />
          </div>
        );

      case "opcion_unica":
        return (
          <div className="space-y-2">
            {(pregunta.opciones || []).map((opcion, index) => (
              <label
                key={`${pregunta.id}-preview-single-${index}`}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <input type="radio" disabled className="accent-blue-500" />
                <span>{opcion}</span>
              </label>
            ))}
          </div>
        );

      case "opcion_multiple":
        return (
          <div className="space-y-2">
            {(pregunta.opciones || []).map((opcion, index) => (
              <div
                key={`${pregunta.id}-preview-multiple-${index}`}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <div className="rounded border border-slate-300 bg-white p-1 text-blue-600">
                  <Check className="w-3 h-3" />
                </div>
                <span>{opcion}</span>
              </div>
            ))}
          </div>
        );

      case "escala":
        return (
          <div className="space-y-2">
            <div className="flex gap-1">
              {Array.from({ length: pasos }, (_, index) => (
                <div
                  key={`${pregunta.id}-scale-${index}`}
                  className="h-4 w-4 rounded-full bg-slate-200"
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{minimo}</span>
              <span>{maximo}</span>
            </div>
          </div>
        );

      case "fecha":
        return (
          <input
            disabled
            type="date"
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm text-slate-600 bg-slate-50"
          />
        );

      case "archivo":
        const formato = pregunta.formatoArchivo || "imagen";
        const icon =
          formato === "video" ? (
            <Video className="w-4 h-4 text-purple-500" />
          ) : (
            <ImageIcon className="w-4 h-4 text-blue-500" />
          );
        return (
          <div className="flex items-center gap-3 rounded border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600">
            {icon}
            <span>
              Subir{" "}
              {formato === "video"
                ? "video"
                : formato === "documento"
                  ? "documento"
                  : "imagen"}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  // Renderizar el paso actual
  const renderStep = () => {
    const permitirPreguntas = permitirTexto || permitirTextoImagen;
    const esSoloVideo = permitirVideo && !permitirPreguntas;

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Información Básica
              </h2>
              <p className="text-slate-600">
                Configura los datos principales de tu formulario de testimonios.
              </p>
            </div>

            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Formulario *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Testimonios de Clientes 2024"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Un título descriptivo para identificar este formulario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Comparte tu experiencia con nuestro servicio. Tu opinión es muy valiosa para nosotros."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este texto aparecerá en la parte superior del formulario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Formatos de Respuesta
              </h2>
              <p className="text-slate-600">
                Selecciona qué tipos de respuestas quieres permitir.
              </p>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="pedirNombre"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Solicitar Nombre
                      </FormLabel>
                      <FormDescription>
                        ¿Quieres pedir el nombre del usuario que envía el
                        testimonio?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pedirCorreo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Solicitar Correo Electrónico
                      </FormLabel>
                      <FormDescription>
                        ¿Quieres pedir el correo electrónico del usuario?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">
                  Formatos de respuesta permitidos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormatOption
                    icon={() => <MessageSquare className="h-5 w-5" />}
                    title="Solo Texto"
                    description="Los usuarios pueden escribir su testimonio en texto plano."
                    active={permitirTexto}
                    onClick={() => {
                      const next = !permitirTexto;
                      form.setValue("permitirTexto", next);
                      if (next) {
                        form.setValue("permitirVideo", false);
                      }
                    }}
                  />
                  <FormatOption
                    icon={() => <MessageSquare className="h-5 w-5" />}
                    title="Texto + Imagen"
                    description="Los usuarios pueden adjuntar una imagen con su testimonio."
                    active={permitirTextoImagen}
                    onClick={() => {
                      const next = !permitirTextoImagen;
                      form.setValue("permitirTextoImagen", next);
                      if (next) {
                        form.setValue("permitirVideo", false);
                      }
                    }}
                  />
                  <FormatOption
                    icon={() => <MessageSquare className="h-5 w-5" />}
                    title="Video"
                    description="Los usuarios pueden grabar o subir un video testimonio."
                    active={permitirVideo}
                    onClick={() => {
                      const next = !permitirVideo;
                      form.setValue("permitirVideo", next);
                      if (next) {
                        form.setValue("permitirTexto", false);
                        form.setValue("permitirTextoImagen", false);
                      }
                    }}
                  />
                </div>
                {(form.formState.errors as any).formatos && (
                  <p className="mt-2 text-sm font-medium text-destructive">
                    {(form.formState.errors as any).formatos.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Configurar Contenido
              </h2>
              <p className="text-slate-600">
                Según el formato seleccionado, configura las preguntas o el
                contenido del testimonio.
              </p>
            </div>

            {esSoloVideo ? (
              <>
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <h3 className="font-medium text-blue-900 mb-1">
                    Este formulario será solo para video
                  </h3>
                  <p className="text-sm text-blue-800">
                    Has configurado el formulario para recopilar únicamente
                    testimonios en video. El usuario final no verá preguntas de
                    texto, solo un bloque para subir o grabar su video.
                  </p>
                </div>

                <div className="mt-6 p-6 bg-white rounded-lg border">
                  <h4 className="text-xl font-semibold mb-2">
                    {form.watch("titulo") || "Título del formulario"}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {form.watch("descripcion") || "Descripción del formulario"}
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 px-6 py-8 bg-slate-50">
                    <Video className="w-8 h-8 text-purple-500" />
                    <p className="text-sm text-slate-600 text-center">
                      Aquí el usuario podrá subir o grabar su video testimonio
                      usando Cloudinary en el formulario público.
                    </p>
                    <div className="inline-flex items-center rounded-md bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                      Vista previa del componente de subida de video
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Mensaje de agradecimiento
                  </h3>
                  <FormField
                    control={form.control}
                    name="mensajeGracias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Mensaje de agradecimiento *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="¡Gracias por compartir tu experiencia con nosotros! Tu testimonio ha sido enviado correctamente y será revisado por nuestro equipo."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urlVolverAlInicio"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-sm">
                          URL para volver al inicio (opcional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: https://miwebsite.com o /inicio"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL a la que el usuario será dirigido al hacer clic en "Volver al inicio" en la página de agradecimiento. Si no la especificas, irá al inicio del sitio.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 bg-white rounded border border-blue-100 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <h4 className="text-lg font-medium">¡Gracias!</h4>
                    </div>
                    <p className="text-slate-700">
                      {form.watch("mensajeGracias")}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {preguntas.map((pregunta, index) => (
                    <div
                      key={pregunta.id}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={pregunta.texto}
                            onChange={(event) =>
                              actualizarPregunta(pregunta.id, {
                                texto: event.target.value,
                              })
                            }
                            placeholder="Escribe tu pregunta aquí"
                            className="w-full p-2 border-b border-gray-200 focus:border-blue-500 focus:outline-none text-base font-medium"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Formato: {formatoEtiquetas[pregunta.tipo]}
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-2">
                          <button
                            type="button"
                            onClick={() =>
                              moverPregunta(pregunta.id, "arriba")
                            }
                            disabled={index === 0}
                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              moverPregunta(pregunta.id, "abajo")
                            }
                            disabled={index === preguntas.length - 1}
                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => eliminarPregunta(pregunta.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 ml-2">
                        {renderTipoPregunta(pregunta)}
                      </div>

                      <div className="mt-3 pt-2 border-t flex justify-between items-center">
                        <div className="flex items-center">
                          <select
                            value={pregunta.tipo}
                            onChange={(event) => {
                              const nuevoTipo =
                                event.target.value as TipoPregunta;
                              const cambios: Partial<Pregunta> = {
                                tipo: nuevoTipo,
                              };

                              if (
                                nuevoTipo === "opcion_unica" ||
                                nuevoTipo === "opcion_multiple"
                              ) {
                                cambios.opciones = pregunta.opciones?.length
                                  ? pregunta.opciones
                                  : ["Opción 1", "Opción 2"];
                                cambios.minimo = undefined;
                                cambios.maximo = undefined;
                                cambios.formatoArchivo = undefined;
                              } else if (nuevoTipo === "escala") {
                                cambios.minimo = pregunta.minimo ?? 1;
                                cambios.maximo = pregunta.maximo ?? 5;
                                cambios.opciones = undefined;
                                cambios.formatoArchivo = undefined;
                              } else if (nuevoTipo === "archivo") {
                                cambios.formatoArchivo =
                                  pregunta.formatoArchivo || "imagen";
                                cambios.opciones = undefined;
                                cambios.minimo = undefined;
                                cambios.maximo = undefined;
                              } else {
                                cambios.opciones = undefined;
                                cambios.minimo = undefined;
                                cambios.maximo = undefined;
                                cambios.formatoArchivo = undefined;
                              }

                              actualizarPregunta(pregunta.id, cambios);
                            }}
                            className="text-sm border rounded p-1"
                          >
                            <option value="texto">Texto corto</option>
                            <option value="opcion_unica">Opción única</option>
                            <option value="opcion_multiple">
                              Opción múltiple
                            </option>
                            <option value="escala">Escala</option>
                            <option value="fecha">Fecha</option>
                            <option value="archivo">Archivo</option>
                          </select>
                        </div>
                        <label className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={pregunta.requerida}
                            onChange={(event) =>
                              actualizarPregunta(pregunta.id, {
                                requerida: event.target.checked,
                              })
                            }
                            className="mr-2"
                          />
                          Requerida
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Agregar pregunta:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <button
                      type="button"
                      onClick={() => agregarPregunta("texto")}
                      className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="w-6 h-6 text-blue-500 mb-1" />
                      <span className="text-sm">Texto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => agregarPregunta("archivo")}
                      className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ImageIcon className="w-6 h-6 text-blue-500 mb-1" />
                      <span className="text-sm">Archivo</span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                  <h3 className="text-lg font-medium mb-4">
                    Vista previa del formulario
                  </h3>
                  <div className="bg-white p-6 rounded border">
                    <h4 className="text-xl font-semibold mb-2">
                      {form.watch("titulo") || "Título del formulario"}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {form.watch("descripcion") || "Descripción del formulario"}
                    </p>

                    {preguntas.length === 0 ? (
                      <p className="text-gray-400 italic">
                        No hay preguntas aún. Agrega una para ver la vista
                        previa.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {preguntas.map((pregunta, index) => (
                          <div key={pregunta.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {pregunta.texto || `Pregunta ${index + 1}`}
                              {pregunta.requerida && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                              <span className="text-xs text-slate-500 block font-normal mt-1">
                                Formato: {formatoEtiquetas[pregunta.tipo]}
                              </span>
                            </label>
                            {renderVistaPreviaPregunta(pregunta)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Mensaje de agradecimiento
                  </h3>
                  <FormField
                    control={form.control}
                    name="mensajeGracias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Mensaje de agradecimiento *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="¡Gracias por compartir tu experiencia con nosotros! Tu testimonio ha sido enviado correctamente y será revisado por nuestro equipo."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urlVolverAlInicio"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-sm">
                          URL para volver al inicio (opcional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: https://miwebsite.com o /inicio"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL a la que el usuario será dirigido al hacer clic en "Volver al inicio" en la página de agradecimiento. Si no la especificas, irá al inicio del sitio.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 bg-white rounded border border-blue-100 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <h4 className="text-lg font-medium">¡Gracias!</h4>
                    </div>
                    <p className="text-slate-700">
                      {form.watch("mensajeGracias")}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Publicar Formulario
              </h2>
              <p className="text-slate-600">
                Configura cómo se compartirá tu formulario de testimonios.
              </p>
            </div>

            <FormField
              control={form.control}
              name="slugPublico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Personalizada *</FormLabel>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      {origin}/f/
                    </span>
                    <Input
                      className="rounded-l-none"
                      placeholder="mi-formulario"
                      {...field}
                    />
                  </div>
                  <FormDescription>
                    Esta será la URL única para acceder a tu formulario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Enlace para compartir
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600 overflow-x-auto">
                  {publicUrl}
                </div>
                <Button
                  type="button"
                  onClick={handleCopyLink}
                  className="whitespace-nowrap"
                >
                  {copied ? "¡Copiado!" : "Copiar enlace"}
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <h3 className="font-medium text-amber-800 mb-2">
                Estado del Formulario
              </h3>
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <select
                          className="p-2 border rounded-md bg-white"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <option value="borrador">Borrador</option>
                          <option value="publicado">Publicado</option>
                        </select>
                      </FormControl>
                      <FormLabel className="m-0!">
                        {field.value === "publicado" ? (
                          <span className="text-green-600">
                            El formulario está publicado y visible
                          </span>
                        ) : (
                          <span className="text-amber-600">
                            El formulario está en borrador y no es visible
                          </span>
                        )}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= step.number
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500"
                  }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 ${currentStep > step.number
                    ? "bg-blue-600"
                    : "bg-slate-200"
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`text-xs text-center ${currentStep === step.number
                ? "text-blue-600 font-medium"
                : "text-slate-500"
                }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido del formulario */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {renderStep()}

          {/* Navegación */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Siguiente <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Guardando..." : "Guardar Formulario"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

interface FormatOptionProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

// Exporta el componente
export function FormatOption({
  icon: Icon,
  title,
  description,
  active,
  onClick,
}: FormatOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg border p-4 transition-all ${active
        ? "border-blue-500 bg-blue-50 shadow-sm"
        : "border-slate-200 hover:border-slate-300"
        }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-blue-500" : "text-slate-400"}`} />
      <div className="flex-1 text-left">
        <h4 className={`font-medium ${active ? "text-blue-700" : "text-slate-700"}`}>
          {title}
        </h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </button>
  );
}
