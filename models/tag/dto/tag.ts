import { z } from 'zod';

export const TagCreateSchema = z.object({
    organizacionId: z.string().uuid(),
    nombre: z.string().min(1).max(100),
});

export const TagUpdateSchema = z.object({
    nombre: z.string().min(1).max(100),
});

export type TagCreateDTO = z.infer<typeof TagCreateSchema>;
export type TagUpdateDTO = z.infer<typeof TagUpdateSchema>;