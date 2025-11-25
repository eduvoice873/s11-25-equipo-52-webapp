import { z } from 'zod';
import { CategoryCreateSchema } from '../../category/dto/category';
import { QuestionCreateSchema } from '@/models/question/dto/question';

export const CategoryFullCreateSchema = z.object({
    category: CategoryCreateSchema,
    questions: z.array(QuestionCreateSchema).min(1),
});

export type CategoryFullDTO = z.infer<typeof CategoryFullCreateSchema>;