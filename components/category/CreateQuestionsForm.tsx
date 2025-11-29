"use client";

import { FaPlus } from "react-icons/fa";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/contexts/global/globalContext";
import { setNewCategoryQuestions, setNewCategoryStep } from "@/contexts/global/globalActions";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type QuestionsCreateDto, QuestionsCreateSchema } from "../../models/question/dto/question";
import { IoCloseOutline } from "react-icons/io5";

export default function CreateQuestionsForm() {
  const {
    state: {
      newCategory: { questions: preguntas },
    },
    dispatch,
  } = useGlobalContext();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuestionsCreateDto>({
    resolver: zodResolver(QuestionsCreateSchema),
    defaultValues: { preguntas },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "preguntas" });

  function handlePreviousStep() {
    dispatch(setNewCategoryStep("category"));
  }

  const submit: SubmitHandler<QuestionsCreateDto> = (data) => {
    dispatch(setNewCategoryQuestions(data.preguntas));
    dispatch(setNewCategoryStep("preview"));
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold">
        ¿Qué preguntas deberían ser respondidas en los testimonios de esta categoría?
      </h1>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        {fields.map((field, i) => (
          <FormField key={field.id} label={`Pregunta #${i + 1}`} error={errors.preguntas && errors.preguntas[i]?.texto}>
            <div className="flex">
              <Input
                placeholder="Ej: ¿Cómo te sentiste durante la ceremonía?"
                {...register(`preguntas.${i}.texto`)}
                state={errors.preguntas && errors.preguntas[i]?.texto ? "error" : "default"}
              />
              {fields.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)}>
                  <IoCloseOutline size={20} />
                </Button>
              )}
            </div>
          </FormField>
        ))}
        <div className="mb-4 ml-3 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            disabled={fields.length >= 5}
            onClick={() => append({ texto: "" })}
          >
            <FaPlus size={20} />
            Agregar una pregunta
          </Button>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="primary" onClick={handlePreviousStep}>
            Atras
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={Object.entries(errors).length > 0 || isSubmitting}
          >
            Siguiente
          </Button>
        </div>
        {errors.preguntas?.root && <span className="text-sm text-red-500">{errors.preguntas.root.message}</span>}
        {errors.preguntas && <span className="text-sm text-red-500">{errors.preguntas.message}</span>}
      </form>
    </Card>
  );
}
