import { z } from 'zod';

export const QuestionCreateSchema = z.object({
    texto: z.string().min(1).max(500),
});

export const QuestionUpdateSchema = z.object({
    texto: z.string().min(1).max(500).optional(),
});

export type QuestionCreateDto = z.infer<typeof QuestionCreateSchema>;
export type QuestionUpdateDto = z.infer<typeof QuestionUpdateSchema>;