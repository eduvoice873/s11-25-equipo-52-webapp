// app/(dashboard)/categories/[id]/edit/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryUpdateSchema } from "@/models/category/dto/category";
import z from "zod";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

 const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof CategoryUpdateSchema>>({
    resolver: zodResolver(CategoryUpdateSchema),
  });

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) throw new Error("Error al cargar la categoría");
        const data = await response.json();
        reset(data);
      } catch (error) {
        toast.error("Error al cargar la categoría");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id, reset]);

  const onSubmit = async (data: z.infer<typeof CategoryUpdateSchema>) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: data }), // Envolver en objeto category
      });

      if (!response.ok) {
        // Solo intenta parsear JSON si hay contenido
        let errorMessage = "Error al actualizar la categoría";
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          try {
            const error = await response.json();
            errorMessage = error.message || error.error || errorMessage;
          } catch {
            // Si falla el parse, usa el mensaje por defecto
          }
        }

        throw new Error(errorMessage);
      }

      toast.success("Categoría actualizada correctamente");
      router.push("/categories");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar la categoría"
      );
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                Nombre para indentificar la categoría 
              </label>
              <Input
                id="nombre"
                placeholder="Ej: graduacion-2025"
                {...register("nombre")}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="titulo" className="block text-sm font-medium mb-1">
                Título Publico para la categoria
              </label>
              <Input
                id="titulo"
                placeholder="Ej: Graduación 2025"
                {...register("titulo")}
              />
              {errors.titulo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium mb-1">
                Mensaje de Bienvenida
              </label>
              <Textarea
                id="mensaje"
                placeholder="Escribe un mensaje de bienvenida para esta categoría"
                rows={4}
                {...register("mensaje")}
              />
              {errors.mensaje && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mensaje.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Actualizando..." : "Actualizar Categoría"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}