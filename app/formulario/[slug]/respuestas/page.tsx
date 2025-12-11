"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, CheckCircle, XCircle, Clock, AlertCircle, MessageSquare, Copy, Check } from "lucide-react";

interface Persona {
  id: string;
  nombreCompleto: string;
  correo?: string;
  fotoUrl?: string;
}

interface RespuestaFormulario {
  id: string;
  formularioId: string;
  personaId: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  respuestasPreguntas: Record<string, any> | null;
  creadoEn: string;
  actualizadoEn: string;
  persona: Persona;
}

interface Pregunta {
  id: string;
  texto: string;
  tipo: string;
  orden: number;
}

interface Formulario {
  id: string;
  nombreFormulario: string;
  descripcion?: string;
  preguntas: Pregunta[];
  slugPublico?: string;
}

export default function RespuestasFormularioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [respuestas, setRespuestas] = useState<RespuestaFormulario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener información del formulario usando el ID
        const formularioRes = await fetch(`/api/formularios/admin/${slug}`);
        if (!formularioRes.ok) {
          const errorData = await formularioRes.json();
          throw new Error(errorData.error || "No se pudo cargar el formulario");
        }
        const formularioData = await formularioRes.json();
        setFormulario({
          id: formularioData.formulario.id,
          nombreFormulario: formularioData.formulario.nombreFormulario,
          descripcion: formularioData.formulario.descripcion,
          preguntas: formularioData.formulario.preguntas,
          slugPublico: formularioData.formulario.slugPublico,
        });

        // Obtener respuestas del formulario
        const respuestasRes = await fetch(
          `/api/respuestas-formulario?formularioId=${formularioData.formulario.id}`
        );
        if (!respuestasRes.ok) {
          throw new Error("No se pudieron cargar las respuestas");
        }
        const respuestasData = await respuestasRes.json();
        setRespuestas(respuestasData.respuestas || []);
      } catch (err: any) {
        console.error("Error al cargar datos:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aprobado
          </Badge>
        );
      case "rechazado":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Rechazado
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleCopySlug = () => {
    const publicUrl = `${window.location.origin}/f/${formulario?.slugPublico || slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-300 rounded w-1/4"></div>
            <div className="h-64 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-gray p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 text-center">{error}</p>
              <Button
                onClick={() => router.back()}
                className="mt-4 mx-auto block"
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex-1">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="mb-2 text-brand-blue hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-brand-blue">
              {formulario?.nombreFormulario || "Respuestas"}
            </h1>
            {formulario?.descripcion && (
              <p className="text-slate-600 mt-1 text-sm">{formulario.descripcion}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 min-w-max">
            <div className="text-center bg-white rounded-lg shadow-sm p-3 border-2 border-brand-light">
              <p className="text-xs text-slate-600 font-semibold">Total</p>
              <p className="text-3xl font-bold text-brand-blue">{respuestas.length}</p>
            </div>
            <button
              onClick={handleCopySlug}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-brand-blue text-white hover:bg-blue-900"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar enlace
                </>
              )}
            </button>
          </div>
        </div>

        {/* Estadísticas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="border-2 border-green-300 bg-green-50 shadow-sm">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-700 font-bold">APROBADAS</p>
                  <p className="text-2xl font-bold text-green-700">
                    {respuestas.filter((r) => r.estado === "aprobado").length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-yellow bg-yellow-50 shadow-sm">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-700 font-bold">PENDIENTES</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {respuestas.filter((r) => r.estado === "pendiente").length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-300 bg-red-50 shadow-sm">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-700 font-bold">RECHAZADAS</p>
                  <p className="text-2xl font-bold text-red-700">
                    {respuestas.filter((r) => r.estado === "rechazado").length}
                  </p>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de respuestas */}
        <div className="space-y-2">
          {respuestas.length === 0 ? (
            <Card className="shadow-sm border-2 border-slate-300">
              <CardContent className="pt-6 text-center text-slate-500 py-8">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-brand-blue" />
                </div>
                <p className="text-base font-bold text-brand-blue">No hay respuestas aún</p>
                <p className="text-xs mt-1 text-slate-600">Comparte tu enlace para recibir respuestas.</p>

              </CardContent>

            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {respuestas.map((respuesta) => (
                <div
                  key={respuesta.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/gestionTestimonio?id=${respuesta.id}`)}
                >
                  <Card
                    className="hover:shadow-md hover:border-brand-light transition-all border-2 border-slate-300 bg-white h-full"
                  >
                    <CardHeader className="pb-2 border-b border-slate-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          {respuesta.persona.fotoUrl ? (
                            <img
                              src={respuesta.persona.fotoUrl}
                              alt={respuesta.persona.nombreCompleto}
                              className="w-10 h-10 rounded-full object-cover border-2 border-brand-light shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
                              <User className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <CardTitle className="text-sm font-bold text-brand-blue truncate">
                              {respuesta.persona.nombreCompleto}
                            </CardTitle>
                            {respuesta.persona.correo && (
                              <p className="text-xs text-slate-500 truncate">
                                {respuesta.persona.correo}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          {getEstadoBadge(respuesta.estado)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-brand-blue bg-blue-50 rounded px-2 py-1.5 font-medium border-l-3 border-brand-light">
                          <Calendar className="w-3 h-3 mr-1.5 shrink-0" />
                          <span className="truncate">{formatDate(respuesta.creadoEn).split(',')[0]}</span>
                        </div>

                        {respuesta.respuestasPreguntas && (
                          <div className="bg-blue-50 rounded p-2 space-y-1.5 border-2 border-brand-light">
                            <p className="text-xs font-bold text-brand-blue flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Respuestas
                            </p>
                            {formulario?.preguntas
                              ?.slice(0, 2)
                              .sort((a, b) => a.orden - b.orden)
                              .map((pregunta) => {
                                const respuestaPregunta =
                                  respuesta.respuestasPreguntas?.[pregunta.id];
                                if (!respuestaPregunta) return null;

                                return (
                                  <div
                                    key={pregunta.id}
                                    className="bg-white rounded border-l-3 border-brand-yellow pl-2 pr-2 py-1.5 text-xs"
                                  >
                                    <p className="font-semibold text-brand-blue line-clamp-1">
                                      {pregunta.texto}
                                    </p>
                                    <p className="text-slate-700 line-clamp-2">
                                      {Array.isArray(respuestaPregunta)
                                        ? respuestaPregunta.join(", ")
                                        : respuestaPregunta}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/gestionTestimonio?id=${respuesta.id}`);
                          }}
                          className="w-full mt-2 bg-brand-blue hover:bg-blue-900 text-white font-bold py-2 px-3 rounded text-sm transition-colors"
                        >
                          Ver más
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
