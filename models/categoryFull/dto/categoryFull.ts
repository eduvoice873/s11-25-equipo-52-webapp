import { z } from 'zod';
import { CategoryCreateSchema, CategoryUpdateSchema } from '../../category/dto/category';
import { QuestionCreateSchema, QuestionUpdateSchema } from '@/models/question/dto/question';

export const CategoryFullCreateSchema = z.object({
    category: CategoryCreateSchema,
    questions: z.array(QuestionCreateSchema).min(1),
});

export const CategoryFullUpdateSchema = z.object({
    category: CategoryUpdateSchema,
    questions: z.array(QuestionUpdateSchema).min(1),
});

export type CategoryFullCreateDto = z.infer<typeof CategoryFullCreateSchema>;
export type CategoryFullUpdateDto = z.infer<typeof CategoryFullUpdateSchema>;