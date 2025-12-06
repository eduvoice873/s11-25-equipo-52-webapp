import { z } from "zod";

export const MedioCreateSchema = z.object({
    tipo: z.enum(['imagen', 'video']),
    url: z.string().url(),
    ancho: z.number().int(),
    alto: z.number().int(),
    duracionSegundos: z.number().int().nullable().optional(),
    bytes: z.number().optional(),
    leyenda: z.string().nullable().optional()
});

export const MedioUpdateSchema = z.object({
    tipo: z.enum(['imagen', 'video']).optional(),
    url: z.string().url().optional(),
    ancho: z.number().int().nullable().optional(),
    alto: z.number().int().nullable().optional(),
    duracionSegundos: z.number().int().nullable().optional(),
    bytes: z.number().optional(),
    leyenda: z.string().nullable().optional()
});

export type MedioCreateDto = z.infer<typeof MedioCreateSchema>;
export type MedioUpdateDto = z.infer<typeof MedioUpdateSchema>;