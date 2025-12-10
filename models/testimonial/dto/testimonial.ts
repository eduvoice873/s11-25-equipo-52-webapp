import { z } from "zod";

export const TestimonialCreateSchema = z.object({
  categoriaId: z.string().uuid(),
  titulo: z.string().min(1).max(100).optional(),
  texto: z.string().min(1).max(1000),
  modalidad: z.enum(["texto_imagen", "video"]),
  estado: z.enum([
    "borrador",
    "en_revision",
    "aprobado",
    "publicado",
    "rechazado",
    "archivado",
  ]),
  calificacion: z.number().min(1).max(5).optional(),
});

export const TestimonialUpdateSchema = z.object({
  titulo: z.string().min(1).max(100).optional(),
  texto: z.string().min(1).max(1000).optional(),
  modalidad: z.enum(["texto_imagen", "video"]).optional(),
  estado: z
    .enum([
      "borrador",
      "en_revision",
      "aprobado",
      "publicado",
      "rechazado",
      "archivado",
    ])
    .optional(),
  destacado: z.boolean().optional(),
  calificacion: z.number().min(1).max(5).optional(),
});

export type TestimonialCreateDto = z.infer<typeof TestimonialCreateSchema>;
export type TestimonialUpdateDto = z.infer<typeof TestimonialUpdateSchema>;
