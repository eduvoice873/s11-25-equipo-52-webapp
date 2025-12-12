// app/categories/create/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { CategoryCreateSchema } from "@/models/category/dto/category";
import { useEffect, useState } from "react";

const formSchema = CategoryCreateSchema;

export default function CreateCategoryPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // Verificar si el usuario es editor
  const isEditor = (session?.user as any)?.rol === "editor";

  useEffect(() => {
    setMounted(true);
    if (isEditor) {
      toast.error("No tienes permisos para crear categorías");
      router.push("/categories");
    }
  }, [isEditor, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      titulo: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Enviar directamente sin anidar
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear la categoría");
      }

      toast.success("Categoría creada correctamente");
      router.push("/categories");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al crear la categoría"
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Nueva Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                Nombre Interno para identificar la categoría *
              </label>
              <Input
                id="nombre"
                placeholder="Este nombre sera usado para identificar la categoría"
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
                Título Público para la categoría *
              </label>
              <Input
                id="titulo"
                placeholder="Título que verán los usuarios al acceder al formulario"
                {...register("titulo")}
              />
              {errors.titulo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium mb-1"
              >
                Mensaje de Acceso *
              </label>
              <Textarea
                id="mensaje"
                placeholder="Mensaje que verán los usuarios al acceder al formulario"
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
                {isSubmitting ? "Creando..." : "Crear Categoría"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}