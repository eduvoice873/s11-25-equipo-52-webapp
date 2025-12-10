"use client";

import { useCategories } from "@/hooks/swr/useCategories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryCard } from "@/components/category/CategoryCard";

export default function CategoriesPage() {
  const { categories, isLoading, error, mutate } = useCategories();
  const router = useRouter();

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
        <Button asChild>
          <Link href="/categories/create">Crear Categoría</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}