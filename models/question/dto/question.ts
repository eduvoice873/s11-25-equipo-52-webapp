import { z } from "zod";

export const QuestionCreateSchema = z.object({
  texto: z.string().min(1, "Este campo es requerido").max(500),
});

export const QuestionsCreateSchema = z.object({
  preguntas: z.array(QuestionCreateSchema).min(1, "El cuestionario debe contener al menos una pregunta").max(5, "El cuestionario está limitado a 5 preguntas"),
});

export const QuestionUpdateSchema = z.object({
  texto: z.string().min(1).max(500).optional(),
});

export type QuestionCreateDto = z.infer<typeof QuestionCreateSchema>;
export type QuestionsCreateDto = z.infer<typeof QuestionsCreateSchema>;
export type QuestionUpdateDto = z.infer<typeof QuestionUpdateSchema>;
