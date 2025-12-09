// components/category/CategoryCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Eye, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCategory } from "@/hooks/swr/useCategory";

export function CategoryCard({
  category,
  className
}: {
  category: any;
  className?: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { deleteCategory } = useCategory(category.id);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCategory();
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      toast.error("Error al eliminar la categoría");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className={cn(
      "group relative bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full hover:shadow-lg hover:border-brand-blue/40 transition-all duration-300",
      className
    )}>
      {/* Header con título y badge */}
      <div className="mb-4">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="font-bold text-brand-blue text-xl leading-tight flex-1">
            {category.nombre}
          </h3>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" />
              {category._count?.testimonios || 0}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {category.mensaje}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
        <Calendar className="h-3.5 w-3.5" />
        <span>
          {new Date(category.creadoEn).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      </div>

      {/* Botones de acción */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue font-medium transition-colors"
          asChild
        >
          <Link href={`/categories/${category.id}`} className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            Ver detalle
          </Link>
        </Button>

        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="text-brand-blue border-brand-blue/20 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
            asChild
          >
            <Link href={`/categories/${category.id}/edit`} className="flex items-center gap-1.5">
              <Pencil className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Editar</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-brand-blue">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Esta acción no se puede deshacer. Se eliminará la categoría y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isDeleting}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}