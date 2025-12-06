import { z } from 'zod';
import { CategoryCreateSchema, CategoryUpdateSchema } from '../../category/dto/category';

// 1. Necesitas la definición del esquema de la pregunta.
// Asumo que esta es la ruta correcta del archivo, según tu import comentado.
import { QuestionCreateSchema, QuestionUpdateSchema } from '@/models/question/dto/question';

// Definición del número mínimo de preguntas
const MIN_QUESTIONS = 1;

export const CategoryFullCreateSchema = z.object({
 category: CategoryCreateSchema,
 // 🚨 SOLUCIÓN: Descomentar y definir el array de preguntas.
 questions: z.array(QuestionCreateSchema).min(MIN_QUESTIONS, `Debe haber al menos ${MIN_QUESTIONS} pregunta.`),
});

export const CategoryFullUpdateSchema = z.object({
  category: CategoryUpdateSchema,
  // 🚨 SOLUCIÓN: Descomentar y definir el array de preguntas para la actualización.
  questions: z.array(QuestionCreateSchema).min(MIN_QUESTIONS, `Debe haber al menos ${MIN_QUESTIONS} pregunta.`),

    // NOTA: Usamos QuestionCreateSchema aquí porque la lógica de update en el servicio
    // BORRA las preguntas viejas y CREA las nuevas (sustitución completa).
});

// Los DTOs ahora incluirán la propiedad 'questions'
export type CategoryFullCreateDto = z.infer<typeof CategoryFullCreateSchema>;
export type CategoryFullUpdateDto = z.infer<typeof CategoryFullUpdateSchema>;