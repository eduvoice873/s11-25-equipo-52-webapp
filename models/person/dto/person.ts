import { z } from "zod";

export const PersonCreateSchema = z.object({
    nombreCompleto: z.string().min(1).max(50),
    correo: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).max(100),
    fotoUrl: z.string().max(200).nullable().optional(),
});

export const PersonUpdateSchema = z.object({
    nombreCompleto: z.string().min(1).max(50).optional(),
    correo: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).max(100).optional(),
    fotoUrl: z.string().max(200).nullable().optional(),
});

export type PersonCreateDto = z.infer<typeof PersonCreateSchema>;
export type PersonUpdateDto = z.infer<typeof PersonUpdateSchema>;