import { z } from "zod";

export const CategoryCreateSchema = z.object({
  nombre: z.string().min(1).max(100),
  titulo: z.string().min(1).max(100),
  mensaje: z.string().min(1).max(500),
});

export const CategoryInputSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  titulo: z.string().min(1, "Este campo es obligatorio").max(100),
  mensaje: z.string().min(1, "Este campo es obligatorio").max(500),
});

export const CategoryUpdateSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  titulo: z.string().min(1).max(100).optional(),
  mensaje: z.string().min(1).max(500).optional(),
});

export type CategoryInputDto = z.infer<typeof CategoryInputSchema>;
export type CategoryCreateDto = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>;
