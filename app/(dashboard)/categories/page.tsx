"use client";

import { useCategories } from "@/hooks/swr/useCategories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CategoryCard } from "@/components/category/CategoryCard";
import { AlertCircle } from "lucide-react";

export default function CategoriesPage() {
  const { categories, isLoading, error, mutate } = useCategories();
  const router = useRouter();
  const { data: session } = useSession();

  // Verificar si el usuario es editor
  const isEditor = (session?.user as any)?.rol === "editor";

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
      }

      // Refresh the categories list
      mutate();
      router.refresh();
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  if (isLoading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error al cargar las categorías</div>;

  return (
    <div className="container mt-6 mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        {isEditor ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-700">Permisos insuficientes</span>
          </div>
        ) : (
          <Button asChild>
            <Link href="/categories/create">Crear Categoría</Link>
          </Button>
        )}
      </div>

      {isEditor && (
        <Card className="border-yellow-200 bg-yellow-50 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-yellow-900">Permisos insuficientes</p>
              <p className="text-sm text-yellow-700 mt-1">
                Los editores no pueden crear ni modificar categorías. Contacta al administrador para realizar esta acción.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}