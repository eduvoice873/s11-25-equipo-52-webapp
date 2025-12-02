import { z } from "zod";

export const UserUpdateSchema = z.object({
    name: z.string().min(2, "El nombre de usuario debe contener al menos 2 caracteres").max(50),
    password: z.string().min(1).max(50).regex(/[A-Z]/, "La contraseña debe contener al menos 1 letra en mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos 1 letra en minúscula")
        .regex(/[0-9]/, "La contraseña debe contener al menos 1 caracter numérico")
        .regex(/[\W_]/, "La contraseña debe contener al menos 1 caracter especial"),
    role: z.enum(['admin', 'editor']).optional()
});

export type UserUpdateDto = z.infer<typeof UserUpdateSchema>;