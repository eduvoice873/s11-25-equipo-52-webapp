// components/category/CategoryCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Eye } from "lucide-react";
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
      "bg-white rounded-lg border border-gray-200 p-4 flex flex-col h-full hover:shadow-md transition-shadow",
      className
    )}>
      <div className="grow">
        <h3 className="font-semibold text-brand-blue text-lg mb-2">
          {category.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.mensaje}
        </p>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
       
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-brand-blue hover:bg-brand-blue/10"
          asChild
        >
          <Link href={`/categories/${category.id}`} className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            Ver detalle
          </Link>
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-brand-blue border-brand-blue hover:bg-brand-blue/10"
            asChild
          >
            <Link href={`/categories/${category.id}/edit`} className="flex items-center">
              <Pencil className="h-4 w-4 mr-1" />
              Editar
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
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