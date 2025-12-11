import { z } from "zod";

export const UserCreateSchema = z.object({
    name: z.string().min(2, "El nombre de usuario debe contener al menos 2 caracteres"),
    email: z.email("Email Inválido"),
    password: z
      .string()
      .regex(
        /[A-Z]/,
        'La contraseña debe contener al menos 1 letra en mayúscula'
      )
      .regex(
        /[a-z]/,
        'La contraseña debe contener al menos 1 letra en minúscula'
      )
      .regex(
        /[0-9]/,
        'La contraseña debe contener al menos 1 caracter numérico'
      )
      .regex(
        /[\W_]/,
        'La contraseña debe contener al menos 1 caracter especial'
      ),
    confirm: z.string(),
    image: z.string().min(1).max(200).nullable().optional(),
    categoriaAsignadaId: z.string().uuid().nullable().optional(),
  })
  .refine(
    (data) => {
      return data.confirm === data.password;
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirm'],
    }
  );

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre de usuario debe contener al menos 2 caracteres')
    .max(50)
    .optional(),
  password: z
    .string()
    .min(1)
    .max(50)
    .regex(/[A-Z]/, 'La contraseña debe contener al menos 1 letra en mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos 1 letra en minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos 1 caracter numérico')
    .regex(/[\W_]/, 'La contraseña debe contener al menos 1 caracter especial')
    .optional(),
  activo: z.boolean().optional(),
  categoriaAsignadaId: z.string().uuid().nullable().optional(),
  image: z.string().nullable().optional(),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
export type UserUpdateDto = z.infer<typeof UserUpdateSchema>;
