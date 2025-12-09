"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Calendar, CheckCircle, XCircle, Clock, AlertCircle, MessageSquare } from "lucide-react";

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
}

export default function RespuestasFormularioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [respuestas, setRespuestas] = useState<RespuestaFormulario[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen  from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  from-slate-50 to-slate-100 p-6">
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
    <div className="min-h-screen  from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <Button
              onClick={() => router.push('/testimonios/gestionar')}
              variant="ghost"
              className="mb-2 hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Formularios
            </Button>
            <h1 className="text-3xl font-bold text-slate-800">
              Respuestas: {formulario?.nombreFormulario || "Formulario"}
            </h1>
            {formulario?.descripcion && (
              <p className="text-slate-600 mt-1">{formulario.descripcion}</p>
            )}
          </div>
          <div className="text-right bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <p className="text-sm text-slate-600 font-medium">Total de respuestas</p>
            <p className="text-4xl font-bold text-indigo-600">{respuestas.length}</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200 bg-green-50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">Aprobadas</p>
                  <p className="text-2xl font-bold text-green-700">
                    {respuestas.filter((r) => r.estado === "aprobado").length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-400 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-600 font-medium mb-1">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {respuestas.filter((r) => r.estado === "pendiente").length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-yellow-400 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600 font-medium mb-1">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-700">
                    {respuestas.filter((r) => r.estado === "rechazado").length}
                  </p>
                </div>
                <XCircle className="w-10 h-10 text-red-400 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de respuestas */}
        <div className="space-y-4">
          {respuestas.length === 0 ? (
            <Card className="shadow-sm border-slate-200">
              <CardContent className="pt-6 text-center text-slate-500 py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-lg font-medium">No hay respuestas para este formulario aún.</p>
                <p className="text-sm mt-2">Las respuestas aparecerán aquí una vez que los usuarios completen el formulario.</p>
              </CardContent>
            </Card>
          ) : (
            respuestas.map((respuesta) => (
              <div
                key={respuesta.id}
                className="cursor-pointer"
                onClick={() => router.push(`/gestionTestimonio?id=${respuesta.id}`)}
              >
                <Card
                  className="hover:shadow-lg transition-all border-slate-200 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {respuesta.persona.fotoUrl ? (
                          <img
                            src={respuesta.persona.fotoUrl}
                            alt={respuesta.persona.nombreCompleto}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full  from-indigo-100 to-purple-100 flex items-center justify-center shadow-sm">
                            <User className="w-6 h-6 text-indigo-600" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg font-semibold text-slate-800">
                            {respuesta.persona.nombreCompleto}
                          </CardTitle>
                          {respuesta.persona.correo && (
                            <p className="text-sm text-slate-500">
                              {respuesta.persona.correo}
                            </p>
                          )}
                        </div>
                      </div>
                      {getEstadoBadge(respuesta.estado)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        Enviado el {formatDate(respuesta.creadoEn)}
                      </div>

                      {respuesta.respuestasPreguntas && (
                        <div className=" from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3 border border-blue-100">
                          <p className="text-sm font-semibold text-indigo-700 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Respuestas a preguntas adicionales:
                          </p>
                          {formulario?.preguntas
                            ?.sort((a, b) => a.orden - b.orden)
                            .map((pregunta) => {
                              const respuestaPregunta =
                                respuesta.respuestasPreguntas?.[pregunta.id];
                              if (!respuestaPregunta) return null;

                              return (
                                <div
                                  key={pregunta.id}
                                  className="bg-white rounded-md border-l-4 border-indigo-400 pl-3 pr-3 py-2 shadow-sm"
                                >
                                  <p className="text-sm font-medium text-slate-700">
                                    {pregunta.texto}
                                  </p>
                                  <p className="text-sm text-slate-900 mt-1 font-medium">
                                    {Array.isArray(respuestaPregunta)
                                      ? respuestaPregunta.join(", ")
                                      : respuestaPregunta}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/gestionTestimonio?id=${respuesta.id}`);
                        }}
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700"
                      >
                        Ver detalle completo y moderar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
