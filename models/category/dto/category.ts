import { z } from 'zod';

export const CategoryCreateSchema = z.object({
    organizacionId: z.string().uuid(),
    creadoPorId: z.string().cuid(),
    nombre: z.string().min(1).max(100),
    titulo: z.string().min(1).max(100),
    mensaje: z.string().min(1).max(500),
});

export const CategoryUpdateSchema = z.object({
    nombre: z.string().min(1).max(100).optional(),
    titulo: z.string().min(1).max(100).optional(),
    mensaje: z.string().min(1).max(500).optional(),
});

export type CategoryCreateDto = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>;