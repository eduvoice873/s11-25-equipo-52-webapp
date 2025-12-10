"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/swr/useCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
;
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  PlusCircle,
  Link as LinkIcon,
  MessageSquare,
  Users,
  BarChart2,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  MoreVertical,
  Eye,
  Share2,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-brand-blue" />}
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      <Separator className="mt-3" />
    </div>
  );
}

function FormularioCard({ formulario, onDelete, onEdit, onDuplicate }: {
  formulario: any;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const modalidad = formulario.permitirVideo
    ? "Video"
    : formulario.permitirTextoImagen
      ? "Texto + Imagen"
      : "Solo Texto";

  const shareUrl = `${origin}/f/${formulario.slugPublico}`;
  const totalRespuestas = formulario.respuestas?.length || 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Enlace copiado al portapapeles");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: formulario.nombreFormulario,
          text: formulario.descripcion || "Comparte tu testimonio",
          url: shareUrl,
        });
        toast.success("Compartido exitosamente");
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete(formulario.id);
  };

  return (
    <>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-brand-blue/30 flex flex-col border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
                {formulario.nombreFormulario}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="bg-blue-50 text-brand-blue border-blue-200">
                {modalidad}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="end" className="w-48 z-50">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => router.push(`/f/${formulario.slugPublico}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Vista previa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copiar enlace
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => router.push(`/formulario/${formulario.id}/respuestas`)}
                    >
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Ver respuestas ({totalRespuestas})
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </div>
          <CardDescription className="text-slate-600 line-clamp-2 mt-2">
            {formulario.descripcion || "Sin descripción"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MessageSquare className="w-4 h-4" />
            <span>{totalRespuestas} respuestas</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-3 border-t">
          <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 truncate max-w-[60%]">
            /{formulario.slugPublico}
          </code>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="text-brand-blue hover:bg-brand-blue/10"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(formulario.id)}
              className="text-brand-blue hover:bg-brand-blue/10"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el formulario
              <strong> "{formulario.nombreFormulario}"</strong> y todas sus {totalRespuestas} respuestas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function TestimonioCard({ item, onApprove, onReject, onDelete }: {
  item: any;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const estadoBadge = {
    pendiente: { icon: Clock, label: "Pendiente", color: "bg-amber-50 text-amber-600 border-amber-200" },
    aprobado: { icon: CheckCircle, label: "Aprobado", color: "bg-green-50 text-green-600 border-green-200" },
    rechazado: { icon: XCircle, label: "Rechazado", color: "bg-red-50 text-red-600 border-red-200" },
  };

  const estadoActual = estadoBadge[item.estado as keyof typeof estadoBadge] || estadoBadge.pendiente;
  const EstadoIcon = estadoActual.icon;

  const handleDelete = () => {
    setShowDeleteDialog(false);
    // Usar testimonioId si existe (para respuestas de formulario), sino usar id (para testimonios directos)
    const idAEliminar = item.testimonioId || item.id;
    onDelete?.(idAEliminar);
  };

  return (
    <>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-brand-blue/30 flex flex-col border-gray-200">
        <CardContent className="p-5 flex-1">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {item.formularioNombre && (
                <span className="text-xs font-medium text-brand-blue">{item.formularioNombre}</span>
              )}
              {item.modalidad && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-brand-blue border-blue-200">
                  {item.modalidad}
                </Badge>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end" className="w-48 z-50">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push(`/gestionTestimonio`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver detalle
                  </DropdownMenuItem>

                  {item.estado === "pendiente" && onApprove && (
                    <DropdownMenuItem onClick={() => onApprove(item.id)} className="text-green-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Aprobar
                    </DropdownMenuItem>
                  )}

                  {item.estado === "pendiente" && onReject && (
                    <DropdownMenuItem onClick={() => onReject(item.id)} className="text-amber-600">
                      <XCircle className="mr-2 h-4 w-4" />
                      Rechazar
                    </DropdownMenuItem>
                  )}

                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>

          <Badge variant="outline" className={`mb-3 ${estadoActual.color}`}>
            <EstadoIcon className="w-3 h-3 mr-1" />
            {estadoActual.label}
          </Badge>

          <h3 className="font-semibold text-slate-900 text-base mb-2 line-clamp-2">{item.titulo}</h3>
          <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">{item.texto}</p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
            {item.persona?.nombreCompleto && (
              <span className="text-xs font-medium text-slate-500">{item.persona.nombreCompleto}</span>
            )}
            {item.calificacion && (
              <div className="flex items-center text-sm font-semibold text-amber-500">
                <span>★</span>
                <span className="ml-1">{item.calificacion}/5</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el testimonio
              <strong> "{item.titulo}"</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function StatsCard({ title, value, icon: Icon, color = "blue" }: { title: string; value: number | string; icon: React.ComponentType<{ className?: string }>; color?: string }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <Card className="overflow-hidden border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// La prop debe ser string, no Promise
export default function CategoryDetails({ id }: { id: string }) {
  const { category, isLoading, error, mutate } = useCategory(id);
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const responses = useMemo(() => {
    if (!category?.formularios) return [];
    return category.formularios.flatMap((formulario) => {
      const modalidad = formulario.permitirVideo
        ? "Video"
        : formulario.permitirTextoImagen
          ? "Texto + Imagen"
          : "Solo Texto";

      return (
        formulario.respuestas?.map((respuesta) => ({
          ...respuesta,
          formularioNombre: formulario.nombreFormulario,
          modalidad,
        })) ?? []
      );
    });
  }, [category]);

  const hasResponses = responses.length > 0;
  const hasPersistedTestimonials = !hasResponses && (category?.testimonios?.length ?? 0) > 0;
  const testimonios = hasResponses ? responses : category?.testimonios ?? [];

  // Handlers para formularios
  const handleDeleteFormulario = async (formularioId: string) => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/formularios/admin/${formularioId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el formulario");
      }

      toast.success("Formulario eliminado exitosamente");
      mutate(); // Revalidar datos
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar el formulario");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditFormulario = (formularioId: string) => {
    router.push(`/formulario/${formularioId}/edit`);
  };

  const handleDuplicateFormulario = async (formularioId: string) => {
    try {
      const response = await fetch(`/api/formularios/admin/${formularioId}/duplicate`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error al duplicar el formulario");
      }

      const data = await response.json();
      toast.success("Formulario duplicado exitosamente");
      mutate(); // Revalidar datos
      router.push(`/formulario/${data.formulario.id}/edit`);
    } catch (error) {
      console.error("Error al duplicar:", error);
      toast.error("Error al duplicar el formulario");
    }
  };

  // Handlers para testimonios
  const handleApproveTestimonio = async (testimonioId: string) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonioId}/moderate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision: "aprobar",
          notas: "Aprobado desde la vista de categoría",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al aprobar el testimonio");
      }

      toast.success("Testimonio aprobado");
      mutate();
    } catch (error) {
      console.error("Error al aprobar:", error);
      toast.error(error instanceof Error ? error.message : "Error al aprobar el testimonio");
    }
  };

  const handleRejectTestimonio = async (testimonioId: string) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonioId}/moderate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision: "rechazar",
          notas: "Rechazado desde la vista de categoría",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al rechazar el testimonio");
      }

      toast.success("Testimonio rechazado");
      mutate();
    } catch (error) {
      console.error("Error al rechazar:", error);
      toast.error(error instanceof Error ? error.message : "Error al rechazar el testimonio");
    }
  };

  const handleDeleteTestimonio = async (testimonioId: string) => {
    try {
      // Si no tiene formato de UUID típico, es un ID de respuesta de formulario
      const isUUID = testimonioId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      const endpoint = isUUID
        ? `/api/testimonials/${testimonioId}`
        : `/api/respuestas-formulario/${testimonioId}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al eliminar el testimonio");
      }

      toast.success("Testimonio eliminado");
      mutate();
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error(error instanceof Error ? error.message : "Error al eliminar el testimonio");
    }
  };  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error al cargar la categoría</h3>
          <p className="text-red-600">No se pudo cargar la información de la categoría solicitada.</p>
        </CardContent>
      </Card>
    );
  }

  const featuredFormSlug = category?.formularios?.[0]?.slugPublico ?? "";
  const shareUrl = featuredFormSlug ? `${origin}/f/${featuredFormSlug}` : `${origin}/f/`;

  const handleCrearFormulario = () => router.push(`/formulario/nuevo?categoriaId=${id}`);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{category.titulo}</h1>
        {category.mensaje && (
          <p className="text-slate-600 mt-3 max-w-3xl leading-relaxed">{category.mensaje}</p>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Formularios"
          value={category.formularios?.length || 0}
          icon={MessageSquare}
          color="blue"
        />
        <StatsCard
          title="Testimonios"
          value={testimonios.length}
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Puntuación"
          value={
            testimonios.length > 0
              ? `${(
                testimonios.reduce((acc, curr) => acc + (curr.calificacion || 0), 0) /
                testimonios.filter(t => t.calificacion).length
              ).toFixed(1)}/5`
              : "N/A"
          }
          icon={BarChart2}
          color="amber"
        />
      </div>

      {/* Formularios Section */}
      <section>
        <SectionHeader
          title="Formularios"
          subtitle="Administra los formularios de esta categoría"
          icon={MessageSquare}
        />

        <Button onClick={handleCrearFormulario} className="mb-6 bg-brand-blue hover:bg-brand-blue/90">
          <PlusCircle className="w-4 h-4 mr-2" />
          Crear nuevo formulario
        </Button>

        {category.formularios && category.formularios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.formularios.map((formulario) => (
              <FormularioCard
                key={formulario.id}
                formulario={formulario}
                onDelete={handleDeleteFormulario}
                onEdit={handleEditFormulario}
                onDuplicate={handleDuplicateFormulario}
              />
            ))}
          </div>
        ) : (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Sin formularios</h3>
              <p className="text-slate-500 mb-6">Aún no has creado formularios para esta categoría.</p>
              <Button onClick={handleCrearFormulario} className="bg-brand-blue hover:bg-brand-blue/90">
                <PlusCircle className="w-4 h-4 mr-2" />
                Crear formulario
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Testimonios Section */}
      <section>
        <SectionHeader
          title="Testimonios"
          subtitle="Últimos testimonios recibidos"
          icon={Users}
        />

        {testimonios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonios.slice(0, 6).map((testimonio, index) => (
              <TestimonioCard
                key={index}
                item={testimonio}
                onApprove={handleApproveTestimonio}
                onReject={handleRejectTestimonio}
                onDelete={handleDeleteTestimonio}
              />
            ))}
          </div>
        ) : (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Sin testimonios</h3>
              <p className="text-slate-500 mb-6">
                {category.formularios?.length
                  ? "Aún no has recibido testimonios en tus formularios."
                  : "Crea un formulario para comenzar a recibir testimonios."}
              </p>
              {!category.formularios?.length && (
                <Button onClick={handleCrearFormulario} className="bg-brand-blue hover:bg-brand-blue/90">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Crear formulario
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}