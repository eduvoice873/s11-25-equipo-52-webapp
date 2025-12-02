import { z } from "zod";

export const ReviewCreateSchema = z.object({
    testimonioId: z.string().uuid(),
    revisorId: z.string().cuid(),
    decision: z.enum(['aprobar', 'rechazar']),
    notas: z.string().optional()
});

export const ReviewUpdateSchema = z.object({
    decision: z.enum(['aprobar', 'rechazar']).optional(),
    notas: z.string().optional()
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;
export type ReviewUpdateDto = z.infer<typeof ReviewUpdateSchema>;