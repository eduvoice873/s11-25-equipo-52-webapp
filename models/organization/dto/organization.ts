import { z } from "zod";

export const OrganizationCreateSchema = z.object({
    nombre: z.string().regex(/^[a-zA-Z0-9 ]+$/).min(1).max(50),
    slug: z.string().min(1).max(100),
});

export const OrganizationUpdateSchema = z.object({
    nombre: z.string().regex(/^[a-zA-Z0-9 ]+$/).min(1).max(50).optional(),
    slug: z.string().min(1).max(100).optional(),
});

export type OrganizationCreateDto = z.infer<typeof OrganizationCreateSchema>;
export type OrganizationUpdateDto = z.infer<typeof OrganizationUpdateSchema>;