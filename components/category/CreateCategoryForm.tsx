"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../ui/card";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/input";
import { CategoryInputDto, CategoryInputSchema } from "@/models/category/dto/category";
import { Button } from "../ui/button";
import slugify from "slugify";
import { useGlobalContext } from "@/contexts/global/globalContext";
import { setNewCategory, setNewCategoryStep } from "@/contexts/global/globalActions";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export default function CreateCategoryForm() {
  const {
    state: {
      newCategory: {
        category: { mensaje, titulo },
      },
    },
    dispatch,
  } = useGlobalContext();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(CategoryInputSchema), defaultValues: { mensaje, titulo } });
  const router = useRouter();

  const submit: SubmitHandler<CategoryInputDto> = (data) => {
    const nombre = slugify(data.titulo, { lower: true });
    dispatch(setNewCategory({ ...data, nombre }));
    dispatch(setNewCategoryStep("questions"));
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold">Define un nombre y un texto descriptivo para esta categoría</h1>
      <form onSubmit={handleSubmit(submit)}>
        <FormField label="Nombre" error={errors.titulo}>
          <Input {...register("titulo")} placeholder="Ej: Grados 2025" state={errors.titulo ? "error" : "default"} />
        </FormField>
        <FormField label="Descripción" error={errors.mensaje}>
          <Textarea
            aria-invalid={errors.mensaje && true}
            {...register("mensaje")}
            placeholder="Ej: Testimonios de participantes de la ceremonia de graduación del año 2025"
          />
        </FormField>

        <div className="flex gap-2">
          <Button type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={Object.values(errors).length > 0 || isSubmitting} className="w-full">
            {isSubmitting ? "Cargando..." : "Siguiente"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
